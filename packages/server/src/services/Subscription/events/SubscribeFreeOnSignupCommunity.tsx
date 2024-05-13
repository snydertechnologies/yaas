import config from '@bigcapital/server/config';
import { IAuthSignedUpEventPayload } from '@bigcapital/server/interfaces';
import events from '@bigcapital/server/subscribers/events';
import { Inject, Service } from 'typedi';
import { Subscription } from '../Subscription';

@Service()
export class SubscribeFreeOnSignupCommunity {
  @Inject()
  private subscriptionService: Subscription;

  /**
   * Attaches events with handlers.
   */
  public attach = (bus) => {
    bus.subscribe(events.auth.signUp, this.subscribeFreeOnSigupCommunity.bind(this));
  };

  /**
   * Creates a new free subscription once the user signup if the app is self-hosted.
   * @param {IAuthSignedUpEventPayload}
   * @returns {Promise<void>}
   */
  private async subscribeFreeOnSigupCommunity({ signupDTO, tenant, user }: IAuthSignedUpEventPayload) {
    if (config.hostedOnBigcapitalCloud) return null;

    await this.subscriptionService.newSubscribtion(tenant.id, 'free');
  }
}
