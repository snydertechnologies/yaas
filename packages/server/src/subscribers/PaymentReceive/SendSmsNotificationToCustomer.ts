import { IPaymentReceiveCreatedPayload } from '@bigcapital/server/interfaces';
import { PaymentReceiveNotifyBySms } from '@bigcapital/server/services/Sales/PaymentReceives/PaymentReceiveSmsNotify';
import { runAfterTransaction } from '@bigcapital/server/services/UnitOfWork/TransactionsHooks';
import events from '@bigcapital/server/subscribers/events';
import { Inject, Service } from 'typedi';

@Service()
export default class SendSmsNotificationPaymentReceive {
  @Inject()
  private paymentReceiveSmsNotify: PaymentReceiveNotifyBySms;

  /**
   * Attach events.
   */
  public attach(bus) {
    bus.subscribe(events.paymentReceive.onCreated, this.handleNotifyViaSmsOncePaymentPublish);
  }

  /**
   * Handles send SMS notification after payment transaction creation.
   */
  private handleNotifyViaSmsOncePaymentPublish = ({
    tenantId,
    paymentReceiveId,
    trx,
  }: IPaymentReceiveCreatedPayload) => {
    // Notify via Sms after transactions complete running.
    runAfterTransaction(trx, async () => {
      try {
        await this.paymentReceiveSmsNotify.notifyViaSmsNotificationAfterCreation(tenantId, paymentReceiveId);
      } catch (error) {}
    });
  };
}
