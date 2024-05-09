import { Container } from 'typedi';
import { On, EventSubscriber } from 'event-dispatch';
import events from '@/subscribers/events';
import SaleReceiptNotifyBySms from '@/services/Sales/SaleReceiptNotifyBySms';
import PaymentReceiveNotifyBySms from './PaymentReceiveSmsNotify';

@EventSubscriber()
export default class SendSmsNotificationPaymentReceive {
  paymentReceiveNotifyBySms: PaymentReceiveNotifyBySms;

  constructor() {
    this.paymentReceiveNotifyBySms = Container.get(PaymentReceiveNotifyBySms);
  }

  /**
   *
   */
  @On(events.paymentReceive.onNotifySms)
  async sendSmsNotificationOnceInvoiceNotify({
    paymentReceive,
    customer,
  }) {
    await this.paymentReceiveNotifyBySms.sendSmsNotification(
      paymentReceive,
      customer
    );
  }
}
