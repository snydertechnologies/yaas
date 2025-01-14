import { IVendorBalanceSummaryQuery, IVendorBalanceSummaryTable } from '@bigcapital/libs-backend';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import { Inject, Service } from 'typedi';
import { VendorBalanceSummaryService } from './VendorBalanceSummaryService';
import { VendorBalanceSummaryTable } from './VendorBalanceSummaryTableRows';

@Service()
export class VendorBalanceSummaryTableInjectable {
  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private vendorBalanceSummarySheet: VendorBalanceSummaryService;

  /**
   * Retrieves the vendor balance summary sheet in table format.
   * @param {number} tenantId
   * @param {IVendorBalanceSummaryQuery} query
   * @returns {Promise<IVendorBalanceSummaryTable>}
   */
  public async table(tenantId: number, query: IVendorBalanceSummaryQuery): Promise<IVendorBalanceSummaryTable> {
    const i18n = this.tenancy.i18n(tenantId);

    const { data, meta } = await this.vendorBalanceSummarySheet.vendorBalanceSummary(tenantId, query);
    const table = new VendorBalanceSummaryTable(data, query, i18n);

    return {
      table: {
        columns: table.tableColumns(),
        rows: table.tableRows(),
      },
      query,
      meta,
    };
  }
}
