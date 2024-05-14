import { IContact } from '@bigcapital/libs-backend';
import { Transformer } from '@bigcapital/server/lib/Transformer/Transformer';
import { formatNumber } from '@bigcapital/server/utils';
import { isNull } from 'lodash';

export default class ContactTransfromer extends Transformer {
  /**
   * Retrieve formatted expense amount.
   * @param {IExpense} expense
   * @returns {string}
   */
  protected formattedBalance = (contact: IContact): string => {
    return formatNumber(contact.balance, {
      currencyCode: contact.currencyCode,
    });
  };

  /**
   * Retrieve formatted expense landed cost amount.
   * @param {IExpense} expense
   * @returns {string}
   */
  protected formattedOpeningBalance = (contact: IContact): string => {
    return !isNull(contact.openingBalance)
      ? formatNumber(contact.openingBalance, {
          currencyCode: contact.currencyCode,
        })
      : '';
  };

  /**
   * Retriecve fromatted date.
   * @param {IExpense} expense
   * @returns {string}
   */
  protected formattedOpeningBalanceAt = (contact: IContact): string => {
    return !isNull(contact.openingBalanceAt) ? this.formatDate(contact.openingBalanceAt) : '';
  };
}
