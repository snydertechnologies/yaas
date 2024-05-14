import {
  IWarehouseTransfer,
  IWarehouseTransferEditedPayload,
  IWarehouseTransferInitiatePayload,
} from '@bigcapital/libs-backend';
import { ServiceError } from '@bigcapital/server/exceptions';
import { EventPublisher } from '@bigcapital/server/lib/EventPublisher/EventPublisher';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import UnitOfWork from '@bigcapital/server/services/UnitOfWork';
import events from '@bigcapital/server/subscribers/events';
import { Knex } from 'knex';
import { Inject, Service } from 'typedi';
import { CommandWarehouseTransfer } from './CommandWarehouseTransfer';
import { ERRORS } from './constants';

@Service()
export class InitiateWarehouseTransfer extends CommandWarehouseTransfer {
  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private uow: UnitOfWork;

  @Inject()
  private eventPublisher: EventPublisher;

  /**
   * Validate the given warehouse transfer not already initiated.
   * @param {IWarehouseTransfer} warehouseTransfer
   */
  private validateWarehouseTransferNotAlreadyInitiated = (warehouseTransfer: IWarehouseTransfer) => {
    if (warehouseTransfer.transferInitiatedAt) {
      throw new ServiceError(ERRORS.WAREHOUSE_TRANSFER_ALREADY_INITIATED);
    }
  };

  /**
   * Initiate warehouse transfer.
   * @param   {number} tenantId
   * @param   {number} warehouseTransferId
   * @returns {Promise<IWarehouseTransfer>}
   */
  public initiateWarehouseTransfer = async (
    tenantId: number,
    warehouseTransferId: number,
  ): Promise<IWarehouseTransfer> => {
    const { WarehouseTransfer } = this.tenancy.models(tenantId);

    // Retrieves the old warehouse transfer transaction.
    const oldWarehouseTransfer = await WarehouseTransfer.query()
      .findById(warehouseTransferId)
      .throwIfNotFound(warehouseTransferId);

    // Validate the given warehouse transfer not already initiated.
    this.validateWarehouseTransferNotAlreadyInitiated(oldWarehouseTransfer);

    // Edits warehouse transfer transaction under unit-of-work envirement.
    return this.uow.withTransaction(tenantId, async (trx: Knex.Transaction) => {
      // Triggers `onWarehouseTransferInitiate` event.
      await this.eventPublisher.emitAsync(events.warehouseTransfer.onInitiate, {
        tenantId,
        oldWarehouseTransfer,
        trx,
      } as IWarehouseTransferInitiatePayload);

      // Updates warehouse transfer graph on the storage.
      const warehouseTransferUpdated = await WarehouseTransfer.query(trx).findById(warehouseTransferId).patch({
        transferInitiatedAt: new Date(),
      });
      // Fetches the warehouse transfer with entries.
      const warehouseTransfer = await WarehouseTransfer.query(trx)
        .findById(warehouseTransferId)
        .withGraphFetched('entries');

      // Triggers `onWarehouseTransferEdit` event
      await this.eventPublisher.emitAsync(events.warehouseTransfer.onInitiated, {
        tenantId,
        warehouseTransfer,
        oldWarehouseTransfer,
        trx,
      } as IWarehouseTransferEditedPayload);
      return warehouseTransfer;
    });
  };
}
