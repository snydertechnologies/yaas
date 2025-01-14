import { ISaleEstimateEventDeliveredPayload, ISaleEstimateEventDeliveringPayload } from '@bigcapital/libs-backend';
import { ServiceError } from '@bigcapital/server/exceptions';
import { EventPublisher } from '@bigcapital/server/lib/EventPublisher/EventPublisher';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import UnitOfWork from '@bigcapital/server/services/UnitOfWork';
import events from '@bigcapital/server/subscribers/events';
import { Knex } from 'knex';
import moment from 'moment';
import { Inject, Service } from 'typedi';
import { ERRORS } from './constants';

@Service()
export class DeliverSaleEstimate {
  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private eventPublisher: EventPublisher;

  @Inject()
  private uow: UnitOfWork;

  /**
   * Mark the sale estimate as delivered.
   * @param {number} tenantId - Tenant id.
   * @param {number} saleEstimateId - Sale estimate id.
   */
  public async deliverSaleEstimate(tenantId: number, saleEstimateId: number): Promise<void> {
    const { SaleEstimate } = this.tenancy.models(tenantId);

    // Retrieve details of the given sale estimate id.
    const oldSaleEstimate = await SaleEstimate.query().findById(saleEstimateId).throwIfNotFound();

    // Throws error in case the sale estimate already published.
    if (oldSaleEstimate.isDelivered) {
      throw new ServiceError(ERRORS.SALE_ESTIMATE_ALREADY_DELIVERED);
    }
    // Updates the sale estimate transaction with assocaited transactions
    // under UOW envirement.
    return this.uow.withTransaction(tenantId, async (trx: Knex.Transaction) => {
      // Triggers `onSaleEstimateDelivering` event.
      await this.eventPublisher.emitAsync(events.saleEstimate.onDelivering, {
        oldSaleEstimate,
        trx,
        tenantId,
      } as ISaleEstimateEventDeliveringPayload);

      // Record the delivered at on the storage.
      const saleEstimate = await SaleEstimate.query(trx).patchAndFetchById(saleEstimateId, {
        deliveredAt: moment().toMySqlDateTime(),
      });
      // Triggers `onSaleEstimateDelivered` event.
      await this.eventPublisher.emitAsync(events.saleEstimate.onDelivered, {
        tenantId,
        saleEstimate,
        trx,
      } as ISaleEstimateEventDeliveredPayload);
    });
  }
}
