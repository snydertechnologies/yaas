import {
  IProjectTimeDeleteEventPayload,
  IProjectTimeDeletedEventPayload,
  IProjectTimeDeletingEventPayload,
} from '@bigcapital/libs-backend';
import { EventPublisher } from '@bigcapital/server/lib/EventPublisher/EventPublisher';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import UnitOfWork from '@bigcapital/server/services/UnitOfWork';
import events from '@bigcapital/server/subscribers/events';
import { Knex } from 'knex';
import { Inject, Service } from 'typedi';

@Service()
export class DeleteTimeService {
  @Inject()
  private uow: UnitOfWork;

  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private eventPublisher: EventPublisher;

  /**
   * Deletes the give task's time that associated to the given project.
   * @param   {number} projectId -
   * @returns {Promise<void>}
   */
  public deleteTime = async (tenantId: number, timeId: number) => {
    const { Time } = this.tenancy.models(tenantId);

    // Validate customer existance.
    const oldTime = await Time.query().findById(timeId).throwIfNotFound();

    // Triggers `onProjectDelete` event.
    await this.eventPublisher.emitAsync(events.projectTime.onDelete, {
      tenantId,
      timeId,
    } as IProjectTimeDeleteEventPayload);

    // Deletes the given project under unit-of-work envirement.
    return this.uow.withTransaction(tenantId, async (trx: Knex.Transaction) => {
      // Triggers `onProjectDeleting` event.
      await this.eventPublisher.emitAsync(events.projectTime.onDeleting, {
        tenantId,
        oldTime,
        trx,
      } as IProjectTimeDeletingEventPayload);

      // Upsert the project object.
      await Time.query(trx).findById(timeId).delete();

      // Triggers `onProjectDeleted` event.
      await this.eventPublisher.emitAsync(events.projectTime.onDeleted, {
        tenantId,
        oldTime,
        trx,
      } as IProjectTimeDeletedEventPayload);
    });
  };
}
