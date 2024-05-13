import { IAccount } from '@bigcapital/server/interfaces';
import { Transformer } from '@bigcapital/server/lib/Transformer/Transformer';
import { formatNumber } from '@bigcapital/server/utils';

export class CashflowAccountTransformer extends Transformer {
  /**
   * Include these attributes to sale invoice object.
   * @returns {string[]}
   */
  public includeAttributes = (): string[] => {
    return ['formattedAmount'];
  };

  /**
   * Exclude these attributes to sale invoice object.
   * @returns {string[]}
   */
  public excludeAttributes = (): string[] => {
    return [
      'predefined',
      'index',
      'accountRootType',
      'accountTypeLabel',
      'accountParentType',
      'isBalanceSheetAccount',
      'isPlSheet',
    ];
  };

  /**
   * Retrieve formatted account amount.
   * @param   {IAccount} invoice
   * @returns {string}
   */
  protected formattedAmount = (account: IAccount): string => {
    return formatNumber(account.amount, {
      currencyCode: account.currencyCode,
    });
  };
}
