import { ISaleInvoiceMailSent } from '@bigcapital/libs-backend';
import { ServiceError } from '@bigcapital/server/exceptions';
import events from '@bigcapital/server/subscribers/events';
import { Inject, Service } from 'typedi';
import { DeliverSaleInvoice } from '../DeliverSaleInvoice';
import { ERRORS } from '../constants';

@Service()
export class InvoiceChangeStatusOnMailSentSubscriber {
  @Inject()
  private markInvoiceDelivedService: DeliverSaleInvoice;

  /**
   * Attaches events.
   */
  public attach(bus) {
    bus.subscribe(events.saleInvoice.onPreMailSend, this.markInvoiceDelivered);
    bus.subscribe(events.saleInvoice.onMailReminderSent, this.markInvoiceDelivered);
  }

  /**
   * Marks the invoice delivered once the invoice mail sent.
   * @param {ISaleInvoiceMailSent}
   * @returns {Promise<void>}
   */
  private markInvoiceDelivered = async ({ tenantId, saleInvoiceId, messageOptions }: ISaleInvoiceMailSent) => {
    try {
      await this.markInvoiceDelivedService.deliverSaleInvoice(tenantId, saleInvoiceId);
    } catch (error) {
      if (error instanceof ServiceError && error.errorType === ERRORS.SALE_INVOICE_ALREADY_DELIVERED) {
      } else {
        throw error;
      }
    }
  };
}
