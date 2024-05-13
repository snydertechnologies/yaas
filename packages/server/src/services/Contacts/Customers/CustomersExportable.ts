import { IItemsFilter } from '@bigcapital/server/interfaces';
import { Exportable } from '@bigcapital/server/services/Export/Exportable';
import { Inject, Service } from 'typedi';
import { CustomersApplication } from './CustomersApplication';

@Service()
export class CustomersExportable extends Exportable {
  @Inject()
  private customersApplication: CustomersApplication;

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

    return this.customersApplication.getCustomers(tenantId, parsedQuery).then((output) => output.customers);
  }
}
