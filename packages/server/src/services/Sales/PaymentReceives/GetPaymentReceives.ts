import { IFilterMeta, IPaginationMeta, IPaymentReceive, IPaymentReceivesFilter } from '@bigcapital/libs-backend';
import { TransformerInjectable } from '@bigcapital/server/lib/Transformer/TransformerInjectable';
import DynamicListingService from '@bigcapital/server/services/DynamicListing/DynamicListService';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import * as R from 'ramda';
import { Inject, Service } from 'typedi';
import { PaymentReceiveTransfromer } from './PaymentReceiveTransformer';

@Service()
export class GetPaymentReceives {
  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private dynamicListService: DynamicListingService;

  @Inject()
  private transformer: TransformerInjectable;

  /**
   * Retrieve payment receives paginated and filterable list.
   * @param {number} tenantId
   * @param {IPaymentReceivesFilter} paymentReceivesFilter
   */
  public async getPaymentReceives(
    tenantId: number,
    filterDTO: IPaymentReceivesFilter,
  ): Promise<{
    paymentReceives: IPaymentReceive[];
    pagination: IPaginationMeta;
    filterMeta: IFilterMeta;
  }> {
    const { PaymentReceive } = this.tenancy.models(tenantId);

    // Parses filter DTO.
    const filter = this.parseListFilterDTO(filterDTO);

    // Dynamic list service.
    const dynamicList = await this.dynamicListService.dynamicList(tenantId, PaymentReceive, filter);
    const { results, pagination } = await PaymentReceive.query()
      .onBuild((builder) => {
        builder.withGraphFetched('customer');
        builder.withGraphFetched('depositAccount');
        dynamicList.buildQuery()(builder);
      })
      .pagination(filter.page - 1, filter.pageSize);

    // Transformer the payment receives models to POJO.
    const transformedPayments = await this.transformer.transform(tenantId, results, new PaymentReceiveTransfromer());
    return {
      paymentReceives: transformedPayments,
      pagination,
      filterMeta: dynamicList.getResponseMeta(),
    };
  }

  /**
   * Parses payments receive list filter DTO.
   * @param filterDTO
   */
  private parseListFilterDTO(filterDTO) {
    return R.compose(this.dynamicListService.parseStringifiedFilter)(filterDTO);
  }
}
