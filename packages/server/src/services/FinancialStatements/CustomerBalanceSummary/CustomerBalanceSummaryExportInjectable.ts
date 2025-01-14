import { ICustomerBalanceSummaryQuery } from '@bigcapital/libs-backend';
import { TableSheet } from '@bigcapital/server/lib/Xlsx/TableSheet';
import { Inject, Service } from 'typedi';
import { CustomerBalanceSummaryTableInjectable } from './CustomerBalanceSummaryTableInjectable';

@Service()
export class CustomerBalanceSummaryExportInjectable {
  @Inject()
  private customerBalanceSummaryTable: CustomerBalanceSummaryTableInjectable;

  /**
   * Retrieves the cashflow sheet in XLSX format.
   * @param {number} tenantId
   * @param {ICustomerBalanceSummaryQuery} query
   * @returns {Promise<Buffer>}
   */
  public async xlsx(tenantId: number, query: ICustomerBalanceSummaryQuery) {
    const table = await this.customerBalanceSummaryTable.table(tenantId, query);

    const tableSheet = new TableSheet(table.table);
    const tableCsv = tableSheet.convertToXLSX();

    return tableSheet.convertToBuffer(tableCsv, 'xlsx');
  }

  /**
   * Retrieves the cashflow sheet in CSV format.
   * @param {number} tenantId
   * @param {ICustomerBalanceSummaryQuery} query
   * @returns {Promise<Buffer>}
   */
  public async csv(tenantId: number, query: ICustomerBalanceSummaryQuery): Promise<string> {
    const table = await this.customerBalanceSummaryTable.table(tenantId, query);

    const tableSheet = new TableSheet(table.table);
    const tableCsv = tableSheet.convertToCSV();

    return tableCsv;
  }
}
