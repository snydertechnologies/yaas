import { IBillPaymentEntryDTO } from '@bigcapital/server/interfaces';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import { entriesAmountDiff } from '@bigcapital/server/utils';
import { Knex } from 'knex';
import { Inject, Service } from 'typedi';

@Service()
export class BillPaymentBillSync {
  @Inject()
  private tenancy: HasTenancyService;

  /**
   * Saves bills payment amount changes different.
   * @param {number} tenantId -
   * @param {IBillPaymentEntryDTO[]} paymentMadeEntries -
   * @param {IBillPaymentEntryDTO[]} oldPaymentMadeEntries -
   */
  public async saveChangeBillsPaymentAmount(
    tenantId: number,
    paymentMadeEntries: IBillPaymentEntryDTO[],
    oldPaymentMadeEntries?: IBillPaymentEntryDTO[],
    trx?: Knex.Transaction,
  ): Promise<void> {
    const { Bill } = this.tenancy.models(tenantId);
    const opers: Promise<void>[] = [];

    const diffEntries = entriesAmountDiff(paymentMadeEntries, oldPaymentMadeEntries, 'paymentAmount', 'billId');
    diffEntries.forEach((diffEntry: { paymentAmount: number; billId: number }) => {
      if (diffEntry.paymentAmount === 0) {
        return;
      }
      const oper = Bill.changePaymentAmount(diffEntry.billId, diffEntry.paymentAmount, trx);
      opers.push(oper);
    });
    await Promise.all(opers);
  }
}
