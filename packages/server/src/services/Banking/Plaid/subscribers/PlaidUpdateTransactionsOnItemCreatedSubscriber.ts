import { IPlaidItemCreatedEventPayload } from '@bigcapital/libs-backend';
import { EventSubscriber } from '@bigcapital/server/lib/EventPublisher/EventPublisher';
import events from '@bigcapital/server/subscribers/events';
import { Inject, Service } from 'typedi';

@Service()
export class PlaidUpdateTransactionsOnItemCreatedSubscriber extends EventSubscriber {
  @Inject('agenda')
  private agenda: any;

  /**
   * Constructor method.
   */
  public attach(bus) {
    bus.subscribe(events.plaid.onItemCreated, this.handleUpdateTransactionsOnItemCreated);
  }

  /**
   * Updates the Plaid item transactions
   * @param {IPlaidItemCreatedEventPayload} payload - Event payload.
   */
  private handleUpdateTransactionsOnItemCreated = async ({
    tenantId,
    plaidItemId,
    plaidAccessToken,
    plaidInstitutionId,
  }: IPlaidItemCreatedEventPayload) => {
    const payload = { tenantId, plaidItemId };
    await this.agenda.now('plaid-update-account-transactions', payload);
  };
}
