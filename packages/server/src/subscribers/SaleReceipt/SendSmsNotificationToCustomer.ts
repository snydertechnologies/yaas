import { ISaleReceiptCreatedPayload } from '@bigcapital/server/interfaces';
import { SaleReceiptNotifyBySms } from '@bigcapital/server/services/Sales/Receipts/SaleReceiptNotifyBySms';
import { runAfterTransaction } from '@bigcapital/server/services/UnitOfWork/TransactionsHooks';
import events from '@bigcapital/server/subscribers/events';
import { Inject, Service } from 'typedi';

@Service()
export default class SendSmsNotificationSaleReceipt {
  @Inject()
  private saleReceiptNotifyBySms: SaleReceiptNotifyBySms;

  /**
   * Attaches events with handlers.
   */
  public attach(bus) {
    bus.subscribe(events.saleReceipt.onCreated, this.handleNotifyViaSmsAfterReceiptCreation);
  }

  /**
   * Notify via SMS message after receipt transaction creation.
   * @param {ISaleReceiptCreatedPayload} payload -
   */
  private handleNotifyViaSmsAfterReceiptCreation = ({
    tenantId,
    saleReceiptId,
    saleReceipt,
    trx,
  }: ISaleReceiptCreatedPayload) => {
    // Can't continue if the sale receipt is not closed.
    if (!saleReceipt.isClosed) return;

    // Notify via sms after transaction complete running.
    runAfterTransaction(trx, async () => {
      try {
        await this.saleReceiptNotifyBySms.notifyViaSmsAfterCreation(tenantId, saleReceiptId);
      } catch (error) {}
    });
  };
}
