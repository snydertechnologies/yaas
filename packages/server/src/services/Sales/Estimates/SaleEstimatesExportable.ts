import { ISalesInvoicesFilter } from '@bigcapital/libs-backend';
import { Exportable } from '@bigcapital/server/services/Export/Exportable';
import { Inject, Service } from 'typedi';
import { SaleEstimatesApplication } from './SaleEstimatesApplication';

@Service()
export class SaleEstimatesExportable extends Exportable {
  @Inject()
  private saleEstimatesApplication: SaleEstimatesApplication;

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
      pageSize: 12000,
    } as ISalesInvoicesFilter;

    return this.saleEstimatesApplication
      .getSaleEstimates(tenantId, parsedQuery)
      .then((output) => output.salesEstimates);
  }
}
