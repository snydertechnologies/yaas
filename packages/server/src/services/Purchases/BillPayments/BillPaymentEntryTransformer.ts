import { Transformer } from '@bigcapital/server/lib/Transformer/Transformer';
import { formatNumber } from '@bigcapital/server/utils';

export class BillPaymentEntryTransformer extends Transformer {
  /**
   * Include these attributes to bill payment object.
   * @returns {Array}
   */
  public includeAttributes = (): string[] => {
    return ['paymentAmountFormatted'];
  };

  /**
   * Retreives the payment amount formatted.
   * @returns {string}
   */
  protected paymentAmountFormatted(entry) {
    return formatNumber(entry.paymentAmount, { money: false });
  }
}
