import { ITenantUserDeletedPayload } from '@bigcapital/libs-backend';
import events from '@bigcapital/server/subscribers/events';
import { SystemUser } from '@bigcapital/server/system/models';

export class SyncTenantUserDelete {
  /**
   * Attaches events with handlers.
   * @param bus
   */
  public attach(bus) {
    bus.subscribe(events.tenantUser.onDeleted, this.syncSystemUserOnceUserDeleted);
  }

  /**
   * Deletes the system user once tenant user be deleted.
   * @param {ITenantUserDeletedPayload} payload -
   */
  private syncSystemUserOnceUserDeleted = async ({ tenantUser }: ITenantUserDeletedPayload) => {
    await SystemUser.query().where('id', tenantUser.systemUserId).delete();
  };
}
