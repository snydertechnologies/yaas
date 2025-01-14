import { IWarehouseTransferDeletePayload, IWarehouseTransferDeletedPayload } from '@bigcapital/libs-backend';
import { EventPublisher } from '@bigcapital/server/lib/EventPublisher/EventPublisher';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import UnitOfWork from '@bigcapital/server/services/UnitOfWork';
import events from '@bigcapital/server/subscribers/events';
import { Knex } from 'knex';
import { Inject, Service } from 'typedi';
import { CRUDWarehouseTransfer } from './CRUDWarehouseTransfer';

@Service()
export class DeleteWarehouseTransfer extends CRUDWarehouseTransfer {
  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private uow: UnitOfWork;

  @Inject()
  private eventPublisher: EventPublisher;

  /**
   * Deletes warehouse transfer transaction.
   * @param   {number} tenantId
   * @param   {number} warehouseTransferId
   * @returns {Promise<void>}
   */
  public deleteWarehouseTransfer = async (tenantId: number, warehouseTransferId: number): Promise<void> => {
    const { WarehouseTransfer, WarehouseTransferEntry } = this.tenancy.models(tenantId);

    // Retrieve the old warehouse transfer or throw not found service error.
    const oldWarehouseTransfer = await WarehouseTransfer.query().findById(warehouseTransferId).throwIfNotFound();

    // Deletes the warehouse transfer under unit-of-work envirement.
    return this.uow.withTransaction(tenantId, async (trx: Knex.Transaction) => {
      // Triggers `onWarehouseTransferCreate` event.
      await this.eventPublisher.emitAsync(events.warehouseTransfer.onDelete, {
        tenantId,
        oldWarehouseTransfer,
        trx,
      } as IWarehouseTransferDeletePayload);

      // Delete warehouse transfer entries.
      await WarehouseTransferEntry.query(trx).where('warehouseTransferId', warehouseTransferId).delete();

      // Delete warehouse transfer.
      await WarehouseTransfer.query(trx).findById(warehouseTransferId).delete();

      // Triggers `onWarehouseTransferDeleted` event
      await this.eventPublisher.emitAsync(events.warehouseTransfer.onDeleted, {
        tenantId,
        oldWarehouseTransfer,
        trx,
      } as IWarehouseTransferDeletedPayload);
    });
  };
}
