import { IAccountsStructureType, IPaymentReceivesFilter } from '@bigcapital/server/interfaces';
import { Exportable } from '@bigcapital/server/services/Export/Exportable';
import { Inject, Service } from 'typedi';
import { PaymentReceivesApplication } from './PaymentReceivesApplication';

@Service()
export class PaymentsReceivedExportable extends Exportable {
  @Inject()
  private paymentReceivedApp: PaymentReceivesApplication;

  /**
   * Retrieves the accounts data to exportable sheet.
   * @param {number} tenantId
   * @param {IPaymentReceivesFilter} query -
   * @returns
   */
  public exportable(tenantId: number, query: IPaymentReceivesFilter) {
    const parsedQuery = {
      sortOrder: 'desc',
      columnSortBy: 'created_at',
      inactiveMode: false,
      ...query,
      structure: IAccountsStructureType.Flat,
    } as IPaymentReceivesFilter;

    return this.paymentReceivedApp.getPaymentReceives(tenantId, parsedQuery).then((output) => output.paymentReceives);
  }
}
