import { IItemEventDeletedPayload, IItemEventDeletingPayload } from '@bigcapital/server/interfaces';
import { EventPublisher } from '@bigcapital/server/lib/EventPublisher/EventPublisher';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import UnitOfWork from '@bigcapital/server/services/UnitOfWork';
import events from '@bigcapital/server/subscribers/events';
import { Knex } from 'knex';
import { Inject, Service } from 'typedi';
import { ERRORS } from './constants';

@Service()
export class DeleteItem {
  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private eventPublisher: EventPublisher;

  @Inject()
  private uow: UnitOfWork;

  /**
   * Delete the given item from the storage.
   * @param {number} tenantId - Tenant id.
   * @param {number} itemId - Item id.
   * @return {Promise<void>}
   */
  public async deleteItem(tenantId: number, itemId: number) {
    const { Item } = this.tenancy.models(tenantId);

    // Retreive the given item or throw not found service error.
    const oldItem = await Item.query().findById(itemId).throwIfNotFound().queryAndThrowIfHasRelations({
      type: ERRORS.ITEM_HAS_ASSOCIATED_TRANSACTIONS,
    });
    // Delete item in unit of work.
    return this.uow.withTransaction(tenantId, async (trx: Knex.Transaction) => {
      // Triggers `onItemDeleting` event.
      await this.eventPublisher.emitAsync(events.item.onDeleting, {
        tenantId,
        trx,
        oldItem,
      } as IItemEventDeletingPayload);

      // Deletes the item.
      await Item.query(trx).findById(itemId).delete();

      const eventPayload: IItemEventDeletedPayload = {
        tenantId,
        oldItem,
        itemId,
        trx,
      };
      // Triggers `onItemDeleted` event.
      await this.eventPublisher.emitAsync(events.item.onDeleted, eventPayload);
    });
  }
}
