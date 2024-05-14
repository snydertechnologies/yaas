import { IOrganizationBuildEventPayload } from '@bigcapital/libs-backend';
import OrganizationService from '@bigcapital/server/services/Organization/OrganizationService';
import events from '@bigcapital/server/subscribers/events';
import { Inject, Service } from 'typedi';

@Service()
export default class OrgSyncTenantAdminUserSubscriber {
  @Inject()
  organizationService: OrganizationService;

  /**
   * Attaches events with handlers.
   */
  public attach(bus) {
    bus.subscribe(events.organization.build, this.assignSystemUserAsAdminRole);
  }

  /**
   * Assign the authorized system user as admin role.
   */
  public assignSystemUserAsAdminRole = async ({ tenantId, systemUser }: IOrganizationBuildEventPayload) => {
    await this.organizationService.syncSystemUserToTenant(tenantId, systemUser);
  };
}
