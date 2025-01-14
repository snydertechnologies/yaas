import { ISaleInvoiceDeletePayload, ISaleInvoiceDeletedPayload, ISystemUser } from '@bigcapital/libs-backend';
import { ServiceError } from '@bigcapital/server/exceptions';
import { EventPublisher } from '@bigcapital/server/lib/EventPublisher/EventPublisher';
import HasTenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import UnitOfWork from '@bigcapital/server/services/UnitOfWork';
import events from '@bigcapital/server/subscribers/events';
import { Knex } from 'knex';
import { Inject, Service } from 'typedi';
import { UnlinkConvertedSaleEstimate } from '../Estimates/UnlinkConvertedSaleEstimate';
import { ERRORS } from './constants';

@Service()
export class DeleteSaleInvoice {
  @Inject()
  private tenancy: HasTenancyService;

  @Inject()
  private unlockEstimateFromInvoice: UnlinkConvertedSaleEstimate;

  @Inject()
  private eventPublisher: EventPublisher;

  @Inject()
  private uow: UnitOfWork;

  /**
   * Validate the sale invoice has no payment entries.
   * @param {number} tenantId
   * @param {number} saleInvoiceId
   */
  private async validateInvoiceHasNoPaymentEntries(tenantId: number, saleInvoiceId: number) {
    const { PaymentReceiveEntry } = this.tenancy.models(tenantId);

    // Retrieve the sale invoice associated payment receive entries.
    const entries = await PaymentReceiveEntry.query().where('invoice_id', saleInvoiceId);
    if (entries.length > 0) {
      throw new ServiceError(ERRORS.INVOICE_HAS_ASSOCIATED_PAYMENT_ENTRIES);
    }
    return entries;
  }

  /**
   * Validate the sale invoice has no applied to credit note transaction.
   * @param {number} tenantId
   * @param {number} invoiceId
   * @returns {Promise<void>}
   */
  public validateInvoiceHasNoAppliedToCredit = async (tenantId: number, invoiceId: number): Promise<void> => {
    const { CreditNoteAppliedInvoice } = this.tenancy.models(tenantId);

    const appliedTransactions = await CreditNoteAppliedInvoice.query().where('invoiceId', invoiceId);
    if (appliedTransactions.length > 0) {
      throw new ServiceError(ERRORS.SALE_INVOICE_HAS_APPLIED_TO_CREDIT_NOTES);
    }
  };

  /**
   * Validate whether sale invoice exists on the storage.
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   */
  private async getInvoiceOrThrowError(tenantId: number, saleInvoiceId: number) {
    const { saleInvoiceRepository } = this.tenancy.repositories(tenantId);

    const saleInvoice = await saleInvoiceRepository.findOneById(saleInvoiceId, 'entries');
    if (!saleInvoice) {
      throw new ServiceError(ERRORS.SALE_INVOICE_NOT_FOUND);
    }
    return saleInvoice;
  }

  /**
   * Deletes the given sale invoice with associated entries
   * and journal transactions.
   * @param {number} tenantId - Tenant id.
   * @param {Number} saleInvoiceId - The given sale invoice id.
   * @param {ISystemUser} authorizedUser -
   */
  public async deleteSaleInvoice(tenantId: number, saleInvoiceId: number, authorizedUser: ISystemUser): Promise<void> {
    const { ItemEntry, SaleInvoice } = this.tenancy.models(tenantId);

    // Retrieve the given sale invoice with associated entries
    // or throw not found error.
    const oldSaleInvoice = await this.getInvoiceOrThrowError(tenantId, saleInvoiceId);
    // Validate the sale invoice has no associated payment entries.
    await this.validateInvoiceHasNoPaymentEntries(tenantId, saleInvoiceId);

    // Validate the sale invoice has applied to credit note transaction.
    await this.validateInvoiceHasNoAppliedToCredit(tenantId, saleInvoiceId);

    // Deletes sale invoice transaction and associate transactions with UOW env.
    return this.uow.withTransaction(tenantId, async (trx: Knex.Transaction) => {
      // Triggers `onSaleInvoiceDelete` event.
      await this.eventPublisher.emitAsync(events.saleInvoice.onDeleting, {
        tenantId,
        saleInvoice: oldSaleInvoice,
        saleInvoiceId,
        trx,
      } as ISaleInvoiceDeletePayload);

      // Unlink the converted sale estimates from the given sale invoice.
      await this.unlockEstimateFromInvoice.unlinkConvertedEstimateFromInvoice(tenantId, saleInvoiceId, trx);
      await ItemEntry.query(trx).where('reference_id', saleInvoiceId).where('reference_type', 'SaleInvoice').delete();

      await SaleInvoice.query(trx).findById(saleInvoiceId).delete();

      // Triggers `onSaleInvoiceDeleted` event.
      await this.eventPublisher.emitAsync(events.saleInvoice.onDeleted, {
        tenantId,
        oldSaleInvoice,
        saleInvoiceId,
        authorizedUser,
        trx,
      } as ISaleInvoiceDeletedPayload);
    });
  }
}
