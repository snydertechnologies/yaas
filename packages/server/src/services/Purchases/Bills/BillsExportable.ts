import { IBillsFilter } from '@bigcapital/server/interfaces';
import { Exportable } from '@bigcapital/server/services/Export/Exportable';
import { Inject, Service } from 'typedi';
import { BillsApplication } from './BillsApplication';

@Service()
export class BillsExportable extends Exportable {
  @Inject()
  private billsApplication: BillsApplication;

  /**
   * Retrieves the accounts data to exportable sheet.
   * @param {number} tenantId
   * @returns
   */
  public exportable(tenantId: number, query: IBillsFilter) {
    const parsedQuery = {
      sortOrder: 'desc',
      columnSortBy: 'created_at',
      ...query,
      page: 1,
      pageSize: 12000,
    } as IBillsFilter;

    return this.billsApplication.getBills(tenantId, parsedQuery).then((output) => output.bills);
  }
}
