import {
  IProjectDeleteEventPayload,
  IProjectDeletedEventPayload,
  IProjectDeletingEventPayload,
} from '@bigcapital/libs-backend';
import { EventPublisher } from '@bigcapital/server/lib/EventPublisher/EventPublisher';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import UnitOfWork from '@bigcapital/server/services/UnitOfWork';
import events from '@bigcapital/server/subscribers/events';
import { Knex } from 'knex';
import { Inject, Service } from 'typedi';

@Service()
export default class DeleteProject {
  @Inject()
  private uow: UnitOfWork;

  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private eventPublisher: EventPublisher;

  /**
   * Deletes the give project.
   * @param {number} projectId -
   * @returns {Promise<void>}
   */
  public deleteProject = async (tenantId: number, projectId: number) => {
    const { Project } = this.tenancy.models(tenantId);

    // Triggers `onProjectDelete` event.
    await this.eventPublisher.emitAsync(events.project.onDelete, {
      tenantId,
      projectId,
    } as IProjectDeleteEventPayload);

    // Validate customer existance.
    const oldProject = await Project.query().findById(projectId).throwIfNotFound();

    // Deletes the given project under unit-of-work envirement.
    return this.uow.withTransaction(tenantId, async (trx: Knex.Transaction) => {
      // Triggers `onProjectDeleting` event.
      await this.eventPublisher.emitAsync(events.project.onDeleting, {
        tenantId,
        oldProject,
        trx,
      } as IProjectDeletingEventPayload);

      // Deletes the project from the storage.
      await Project.query(trx).findById(projectId).delete();

      // Triggers `onProjectDeleted` event.
      await this.eventPublisher.emitAsync(events.project.onDeleted, {
        tenantId,
        oldProject,
        trx,
      } as IProjectDeletedEventPayload);
    });
  };
}
