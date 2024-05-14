import { IFilterMeta, IPaginationMeta, ISaleReceipt, ISalesReceiptsFilter } from '@bigcapital/libs-backend';
import { TransformerInjectable } from '@bigcapital/server/lib/Transformer/TransformerInjectable';
import DynamicListingService from '@bigcapital/server/services/DynamicListing/DynamicListService';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import * as R from 'ramda';
import { Inject, Service } from 'typedi';
import { SaleReceiptTransformer } from './SaleReceiptTransformer';

interface GetSaleReceiptsSettings {
  fetchEntriesGraph?: boolean;
}
@Service()
export class GetSaleReceipts {
  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private transformer: TransformerInjectable;

  @Inject()
  private dynamicListService: DynamicListingService;

  /**
   * Retrieve sales receipts paginated and filterable list.
   * @param {number} tenantId
   * @param {ISaleReceiptFilter} salesReceiptsFilter
   */
  public async getSaleReceipts(
    tenantId: number,
    filterDTO: ISalesReceiptsFilter,
  ): Promise<{
    data: ISaleReceipt[];
    pagination: IPaginationMeta;
    filterMeta: IFilterMeta;
  }> {
    const { SaleReceipt } = this.tenancy.models(tenantId);

    // Parses the stringified filter roles.
    const filter = this.parseListFilterDTO(filterDTO);

    // Dynamic list service.
    const dynamicFilter = await this.dynamicListService.dynamicList(tenantId, SaleReceipt, filter);
    const { results, pagination } = await SaleReceipt.query()
      .onBuild((builder) => {
        builder.withGraphFetched('depositAccount');
        builder.withGraphFetched('customer');
        builder.withGraphFetched('entries.item');

        dynamicFilter.buildQuery()(builder);
      })
      .pagination(filter.page - 1, filter.pageSize);

    // Transformes the estimates models to POJO.
    const salesEstimates = await this.transformer.transform(tenantId, results, new SaleReceiptTransformer());
    return {
      data: salesEstimates,
      pagination,
      filterMeta: dynamicFilter.getResponseMeta(),
    };
  }

  /**
   * Parses the sale invoice list filter DTO.
   * @param filterDTO
   * @returns
   */
  private parseListFilterDTO(filterDTO) {
    return R.compose(this.dynamicListService.parseStringifiedFilter)(filterDTO);
  }
}
