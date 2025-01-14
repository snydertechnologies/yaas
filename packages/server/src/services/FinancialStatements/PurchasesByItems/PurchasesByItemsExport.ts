import { IPurchasesByItemsReportQuery } from '@bigcapital/libs-backend';
import { TableSheet } from '@bigcapital/server/lib/Xlsx/TableSheet';
import { Inject, Service } from 'typedi';
import { PurchasesByItemsTableInjectable } from './PurchasesByItemsTableInjectable';

@Service()
export class PurchasesByItemsExport {
  @Inject()
  private purchasesByItemsTable: PurchasesByItemsTableInjectable;

  /**
   * Retrieves the purchases by items sheet in XLSX format.
   * @param {number} tenantId
   * @param {IPurchasesByItemsReportQuery} query
   * @returns {Promise<Buffer>}
   */
  public async xlsx(tenantId: number, query: IPurchasesByItemsReportQuery): Promise<Buffer> {
    const table = await this.purchasesByItemsTable.table(tenantId, query);

    const tableSheet = new TableSheet(table.table);
    const tableCsv = tableSheet.convertToXLSX();

    return tableSheet.convertToBuffer(tableCsv, 'xlsx');
  }

  /**
   * Retrieves the purchases by items sheet in CSV format.
   * @param {number} tenantId
   * @param {IPurchasesByItemsReportQuery} query
   * @returns {Promise<Buffer>}
   */
  public async csv(tenantId: number, query: IPurchasesByItemsReportQuery): Promise<string> {
    const table = await this.purchasesByItemsTable.table(tenantId, query);

    const tableSheet = new TableSheet(table.table);
    const tableCsv = tableSheet.convertToCSV();

    return tableCsv;
  }
}
