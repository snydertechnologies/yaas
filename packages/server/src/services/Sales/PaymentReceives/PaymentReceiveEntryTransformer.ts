import { Transformer } from '@bigcapital/server/lib/Transformer/Transformer';
import { formatNumber } from '@bigcapital/server/utils';
import { SaleInvoiceTransformer } from '../Invoices/SaleInvoiceTransformer';

export class PaymentReceiveEntryTransfromer extends Transformer {
  /**
   * Include these attributes to payment receive entry object.
   * @returns {Array}
   */
  public includeAttributes = (): string[] => {
    return ['paymentAmountFormatted', 'invoice'];
  };

  /**
   * Retreives the payment amount formatted.
   * @param entry
   * @returns {string}
   */
  protected paymentAmountFormatted(entry) {
    return formatNumber(entry.paymentAmount, { money: false });
  }

  /**
   * Retreives the transformed invoice.
   */
  protected invoice(entry) {
    return this.item(entry.invoice, new SaleInvoiceTransformer());
  }
}
