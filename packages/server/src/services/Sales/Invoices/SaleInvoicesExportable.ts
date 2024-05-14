import { ISalesInvoicesFilter } from '@bigcapital/libs-backend';
import { Exportable } from '@bigcapital/server/services/Export/Exportable';
import { Inject, Service } from 'typedi';
import { SaleInvoiceApplication } from './SaleInvoicesApplication';

@Service()
export class SaleInvoicesExportable extends Exportable {
  @Inject()
  private saleInvoicesApplication: SaleInvoiceApplication;

  /**
   * Retrieves the accounts data to exportable sheet.
   * @param {number} tenantId
   * @returns
   */
  public exportable(tenantId: number, query: ISalesInvoicesFilter) {
    const parsedQuery = {
      sortOrder: 'desc',
      columnSortBy: 'created_at',
      ...query,
      page: 1,
      pageSize: 120000,
    } as ISalesInvoicesFilter;

    return this.saleInvoicesApplication.getSaleInvoices(tenantId, parsedQuery).then((output) => output.salesInvoices);
  }
}
