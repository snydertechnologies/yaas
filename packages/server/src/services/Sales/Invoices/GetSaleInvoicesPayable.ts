import { ISaleInvoice } from '@bigcapital/libs-backend';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import { Inject, Service } from 'typedi';

@Service()
export class GetSaleInvoicesPayable {
  @Inject()
  private tenancy: HasTenancyService;

  /**
   * Retrieve due sales invoices.
   * @param {number} tenantId
   * @param {number} customerId
   */
  public async getPayableInvoices(tenantId: number, customerId?: number): Promise<ISaleInvoice> {
    const { SaleInvoice } = this.tenancy.models(tenantId);

    const salesInvoices = await SaleInvoice.query().onBuild((query) => {
      query.modify('dueInvoices');
      query.modify('delivered');

      if (customerId) {
        query.where('customer_id', customerId);
      }
    });
    return salesInvoices;
  }
}
