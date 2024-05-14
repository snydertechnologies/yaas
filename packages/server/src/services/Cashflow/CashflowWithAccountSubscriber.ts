import { IAccountEventDeletePayload } from '@bigcapital/libs-backend';
import events from '@bigcapital/server/subscribers/events';
import { Inject, Service } from 'typedi';
import CashflowDeleteAccount from './CashflowDeleteAccount';

@Service()
export default class CashflowWithAccountSubscriber {
  @Inject()
  cashflowDeleteAccount: CashflowDeleteAccount;

  /**
   * Attaches events with handlers.
   */
  public attach = (bus) => {
    bus.subscribe(events.accounts.onDelete, this.validateAccountHasNoCashflowTransactionsOnDelete);
  };

  /**
   * Validate chart account has no associated cashflow transactions on delete.
   * @param {IAccountEventDeletePayload} payload -
   */
  private validateAccountHasNoCashflowTransactionsOnDelete = async ({
    tenantId,
    oldAccount,
  }: IAccountEventDeletePayload) => {
    await this.cashflowDeleteAccount.validateAccountHasNoCashflowEntries(tenantId, oldAccount.id);
  };
}
