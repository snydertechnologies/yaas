import LedgerStorageService from '@bigcapital/server/services/Accounting/LedgerStorageService';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import { Knex } from 'knex';
import { Inject, Service } from 'typedi';
import { SaleInvoiceWriteoffGLEntries } from './SaleInvoiceWriteoffGLEntries';

@Service()
export class SaleInvoiceWriteoffGLStorage {
  @Inject()
  private invoiceWriteoffLedger: SaleInvoiceWriteoffGLEntries;

  @Inject()
  private ledgerStorage: LedgerStorageService;

  @Inject()
  private tenancy: HasTenancyService;

  /**
   * Writes the invoice write-off GL entries.
   * @param   {number} tenantId
   * @param   {number} saleInvoiceId
   * @param   {Knex.Transaction} trx
   * @returns {Promise<void>}
   */
  public writeInvoiceWriteoffEntries = async (tenantId: number, saleInvoiceId: number, trx?: Knex.Transaction) => {
    const { SaleInvoice } = this.tenancy.models(tenantId);
    const { accountRepository } = this.tenancy.repositories(tenantId);

    // Retrieves the sale invoice.
    const saleInvoice = await SaleInvoice.query(trx)
      .findById(saleInvoiceId)
      .withGraphFetched('writtenoffExpenseAccount');

    // Find or create the A/R account.
    const ARAccount = await accountRepository.findOrCreateAccountReceivable(saleInvoice.currencyCode, {}, trx);
    // Retrieves the invoice write-off ledger.
    const ledger = this.invoiceWriteoffLedger.getInvoiceWriteoffLedger(ARAccount.id, saleInvoice);
    return this.ledgerStorage.commit(tenantId, ledger, trx);
  };

  /**
   * Rewrites the invoice write-off GL entries.
   * @param   {number} tenantId
   * @param   {number} saleInvoiceId
   * @param   {Knex.Transactio} actiontrx
   * @returns {Promise<void>}
   */
  public rewriteInvoiceWriteoffEntries = async (tenantId: number, saleInvoiceId: number, trx?: Knex.Transaction) => {
    await this.revertInvoiceWriteoffEntries(tenantId, saleInvoiceId, trx);

    await this.writeInvoiceWriteoffEntries(tenantId, saleInvoiceId, trx);
  };

  /**
   * Reverts the invoice write-off GL entries.
   * @param   {number} tenantId
   * @param   {number} saleInvoiceId
   * @param   {Knex.Transaction} trx
   * @returns {Promise<void>}
   */
  public revertInvoiceWriteoffEntries = async (tenantId: number, saleInvoiceId: number, trx?: Knex.Transaction) => {
    await this.ledgerStorage.deleteByReference(tenantId, saleInvoiceId, 'InvoiceWriteOff', trx);
  };
}
