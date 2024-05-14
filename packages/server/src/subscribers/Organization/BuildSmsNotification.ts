import { IOrganizationBuildEventPayload } from '@bigcapital/libs-backend';
import events from '@bigcapital/server/subscribers/events';
import { Inject, Service } from 'typedi';

@Service()
export default class OrgBuildSmsNotificationSubscriber {
  @Inject('agenda')
  agenda: any;

  /**
   * Attaches events with handlers.
   */
  public attach(bus) {
    bus.subscribe(events.organization.build, this.sendWelcomeSmsNotification);
  }

  /**
   * Sends welcome SMS once the organization build completed.
   */
  public sendWelcomeSmsNotification = async ({ tenantId, systemUser }: IOrganizationBuildEventPayload) => {
    // await this.agenda.now('welcome-sms', { tenant, user });
  };
}
