import { IRefundCreditNoteCreatedPayload, IRefundCreditNoteDeletedPayload } from '@bigcapital/libs-backend';
import events from '@bigcapital/server/subscribers/events';
import { Inject, Service } from 'typedi';
import RefundSyncCreditNoteBalance from './RefundSyncCreditNoteBalance';

@Service()
export default class RefundSyncCreditNoteBalanceSubscriber {
  @Inject()
  refundSyncCreditBalance: RefundSyncCreditNoteBalance;

  /**
   * Attaches events with handlers.
   */
  attach(bus) {
    bus.subscribe(events.creditNote.onRefundCreated, this.incrementRefundedAmountOnceRefundCreated);
    bus.subscribe(events.creditNote.onRefundDeleted, this.decrementRefundedAmountOnceRefundDeleted);
    return bus;
  }

  /**
   * Increment credit note refunded amount once associated refund transaction created.
   * @param {IRefundCreditNoteCreatedPayload} payload -
   */
  private incrementRefundedAmountOnceRefundCreated = async ({
    trx,
    refundCreditNote,
    tenantId,
  }: IRefundCreditNoteCreatedPayload) => {
    await this.refundSyncCreditBalance.incrementCreditNoteRefundAmount(
      tenantId,
      refundCreditNote.creditNoteId,
      refundCreditNote.amount,
      trx,
    );
  };

  /**
   * Decrement credit note refunded amount once associated refuned transaction deleted.
   * @param {IRefundCreditNoteDeletedPayload} payload -
   */
  private decrementRefundedAmountOnceRefundDeleted = async ({
    trx,
    oldRefundCredit,
    tenantId,
  }: IRefundCreditNoteDeletedPayload) => {
    await this.refundSyncCreditBalance.decrementCreditNoteRefundAmount(
      tenantId,
      oldRefundCredit.creditNoteId,
      oldRefundCredit.amount,
      trx,
    );
  };
}
