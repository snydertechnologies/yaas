import { ICashflowAccount, ICashflowAccountsFilter } from '@bigcapital/libs-backend';
import { TransformerInjectable } from '@bigcapital/server/lib/Transformer/TransformerInjectable';
import DynamicListingService from '@bigcapital/server/services/DynamicListing/DynamicListService';
import TenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import { Inject, Service } from 'typedi';
import { CashflowAccountTransformer } from './CashflowAccountTransformer';

@Service()
export default class GetCashflowAccountsService {
  @Inject()
  private tenancy: TenancyService;

  @Inject()
  private dynamicListService: DynamicListingService;

  @Inject()
  private transformer: TransformerInjectable;

  /**
   * Retrieve the cash flow accounts.
   * @param {number} tenantId - Tenant id.
   * @param {ICashflowAccountsFilter} filterDTO - Filter DTO.
   * @returns {ICashflowAccount[]}
   */
  public async getCashflowAccounts(
    tenantId: number,
    filterDTO: ICashflowAccountsFilter,
  ): Promise<{ cashflowAccounts: ICashflowAccount[] }> {
    const { CashflowAccount } = this.tenancy.models(tenantId);

    // Parsees accounts list filter DTO.
    const filter = this.dynamicListService.parseStringifiedFilter(filterDTO);

    // Dynamic list service.
    const dynamicList = await this.dynamicListService.dynamicList(tenantId, CashflowAccount, filter);
    // Retrieve accounts model based on the given query.
    const accounts = await CashflowAccount.query().onBuild((builder) => {
      dynamicList.buildQuery()(builder);

      builder.whereIn('account_type', ['bank', 'cash']);
      builder.modify('inactiveMode', filter.inactiveMode);
    });
    // Retrieves the transformed accounts.
    return this.transformer.transform(tenantId, accounts, new CashflowAccountTransformer());
  }
}
