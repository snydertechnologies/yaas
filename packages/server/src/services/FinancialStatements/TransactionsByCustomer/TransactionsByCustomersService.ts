import {
  ILedgerEntry,
  ITransactionsByCustomersFilter,
  ITransactionsByCustomersService,
  ITransactionsByCustomersStatement,
} from '@bigcapital/libs-backend';
import Ledger from '@bigcapital/server/services/Accounting/Ledger';
import TenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import { Tenant } from '@bigcapital/server/system/models';
import moment from 'moment';
import * as R from 'ramda';
import { Inject } from 'typedi';
import TransactionsByCustomers from './TransactionsByCustomers';
import { TransactionsByCustomersMeta } from './TransactionsByCustomersMeta';
import TransactionsByCustomersRepository from './TransactionsByCustomersRepository';

export class TransactionsByCustomersSheet implements ITransactionsByCustomersService {
  @Inject()
  private tenancy: TenancyService;

  @Inject()
  private reportRepository: TransactionsByCustomersRepository;

  @Inject()
  private transactionsByCustomersMeta: TransactionsByCustomersMeta;

  /**
   * Defaults balance sheet filter query.
   * @return {ICustomerBalanceSummaryQuery}
   */
  private get defaultQuery(): ITransactionsByCustomersFilter {
    return {
      fromDate: moment().startOf('month').format('YYYY-MM-DD'),
      toDate: moment().format('YYYY-MM-DD'),
      numberFormat: {
        precision: 2,
        divideOn1000: false,
        showZero: false,
        formatMoney: 'total',
        negativeFormat: 'mines',
      },
      comparison: {
        percentageOfColumn: true,
      },
      noneZero: false,
      noneTransactions: true,
      customersIds: [],
    };
  }

  /**
   * Retrieve the customers opening balance ledger entries.
   * @param {number} tenantId
   * @param {Date} openingDate
   * @param {number[]} customersIds
   * @returns {Promise<ILedgerEntry[]>}
   */
  private async getCustomersOpeningBalanceEntries(
    tenantId: number,
    openingDate: Date,
    customersIds?: number[],
  ): Promise<ILedgerEntry[]> {
    const openingTransactions = await this.reportRepository.getCustomersOpeningBalanceTransactions(
      tenantId,
      openingDate,
      customersIds,
    );

    return R.compose(
      R.map(R.assoc('date', openingDate)),
      R.map(R.assoc('accountNormal', 'debit')),
    )(openingTransactions);
  }

  /**
   * Retrieve the customers periods ledger entries.
   * @param {number} tenantId
   * @param {Date} fromDate
   * @param {Date} toDate
   * @returns {Promise<ILedgerEntry[]>}
   */
  private async getCustomersPeriodsEntries(
    tenantId: number,
    fromDate: Date | string,
    toDate: Date | string,
  ): Promise<ILedgerEntry[]> {
    const transactions = await this.reportRepository.getCustomersPeriodTransactions(tenantId, fromDate, toDate);
    return R.compose(
      R.map(R.assoc('accountNormal', 'debit')),
      R.map((trans) => ({
        ...trans,
        referenceTypeFormatted: trans.referenceTypeFormatted,
      })),
    )(transactions);
  }

  /**
   * Retrieve transactions by by the customers.
   * @param {number} tenantId
   * @param {ITransactionsByCustomersFilter} query
   * @return {Promise<ITransactionsByCustomersStatement>}
   */
  public async transactionsByCustomers(
    tenantId: number,
    query: ITransactionsByCustomersFilter,
  ): Promise<ITransactionsByCustomersStatement> {
    const { accountRepository } = this.tenancy.repositories(tenantId);
    const i18n = this.tenancy.i18n(tenantId);

    // Retrieve tenant information.
    const tenant = await Tenant.query().findById(tenantId).withGraphFetched('metadata');

    const filter = {
      ...this.defaultQuery,
      ...query,
    };
    const accountsGraph = await accountRepository.getDependencyGraph();

    // Retrieve the report customers.
    const customers = await this.reportRepository.getCustomers(tenantId, filter.customersIds);

    const openingBalanceDate = moment(filter.fromDate).subtract(1, 'days').toDate();

    // Retrieve all ledger transactions of the opening balance of.
    const openingBalanceEntries = await this.getCustomersOpeningBalanceEntries(tenantId, openingBalanceDate);
    // Retrieve all ledger transactions between opeing and closing period.
    const customersTransactions = await this.getCustomersPeriodsEntries(tenantId, query.fromDate, query.toDate);
    // Concats the opening balance and period customer ledger transactions.
    const journalTransactions = [...openingBalanceEntries, ...customersTransactions];
    const journal = new Ledger(journalTransactions);

    // Transactions by customers data mapper.
    const reportInstance = new TransactionsByCustomers(
      customers,
      accountsGraph,
      journal,
      filter,
      tenant.metadata.baseCurrency,
      i18n,
    );

    const meta = await this.transactionsByCustomersMeta.meta(tenantId, filter);

    return {
      data: reportInstance.reportData(),
      query: filter,
      meta,
    };
  }
}
