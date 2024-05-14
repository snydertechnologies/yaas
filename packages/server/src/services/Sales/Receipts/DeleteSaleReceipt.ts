import { ISaleReceiptDeletingPayload, ISaleReceiptEventDeletedPayload } from '@bigcapital/libs-backend';
import { EventPublisher } from '@bigcapital/server/lib/EventPublisher/EventPublisher';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import UnitOfWork from '@bigcapital/server/services/UnitOfWork';
import events from '@bigcapital/server/subscribers/events';
import { Knex } from 'knex';
import { Inject, Service } from 'typedi';
import { SaleReceiptValidators } from './SaleReceiptValidators';

@Service()
export class DeleteSaleReceipt {
  @Inject()
  private eventPublisher: EventPublisher;

  @Inject()
  private uow: UnitOfWork;

  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private validators: SaleReceiptValidators;

  /**
   * Deletes the sale receipt with associated entries.
   * @param {Integer} saleReceiptId
   * @return {void}
   */
  public async deleteSaleReceipt(tenantId: number, saleReceiptId: number) {
    const { SaleReceipt, ItemEntry } = this.tenancy.models(tenantId);

    const oldSaleReceipt = await SaleReceipt.query().findById(saleReceiptId).withGraphFetched('entries');

    // Validates the sale receipt existance.
    this.validators.validateReceiptExistance(oldSaleReceipt);

    return this.uow.withTransaction(tenantId, async (trx: Knex.Transaction) => {
      // Triggers  `onSaleReceiptsDeleting` event.
      await this.eventPublisher.emitAsync(events.saleReceipt.onDeleting, {
        trx,
        oldSaleReceipt,
        tenantId,
      } as ISaleReceiptDeletingPayload);

      await ItemEntry.query(trx).where('reference_id', saleReceiptId).where('reference_type', 'SaleReceipt').delete();

      // Delete the sale receipt transaction.
      await SaleReceipt.query(trx).where('id', saleReceiptId).delete();

      // Triggers `onSaleReceiptsDeleted` event.
      await this.eventPublisher.emitAsync(events.saleReceipt.onDeleted, {
        tenantId,
        saleReceiptId,
        oldSaleReceipt,
        trx,
      } as ISaleReceiptEventDeletedPayload);
    });
  }
}
