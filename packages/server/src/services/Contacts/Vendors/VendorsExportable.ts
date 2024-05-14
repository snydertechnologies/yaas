import { IItemsFilter } from '@bigcapital/libs-backend';
import { Exportable } from '@bigcapital/server/services/Export/Exportable';
import { Inject, Service } from 'typedi';
import { VendorsApplication } from './VendorsApplication';

@Service()
export class VendorsExportable extends Exportable {
  @Inject()
  private vendorsApplication: VendorsApplication;

  /**
   * Retrieves the accounts data to exportable sheet.
   * @param {number} tenantId
   * @returns
   */
  public exportable(tenantId: number, query: IItemsFilter) {
    const parsedQuery = {
      sortOrder: 'DESC',
      columnSortBy: 'created_at',
      page: 1,
      ...query,
      pageSize: 12,
    } as IItemsFilter;

    return this.vendorsApplication.getVendors(tenantId, parsedQuery).then((output) => output.vendors);
  }
}
