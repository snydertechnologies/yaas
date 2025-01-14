import { ISaleReceiptEditedPayload, ISaleReceiptEditingPayload } from '@bigcapital/libs-backend';
import { EventPublisher } from '@bigcapital/server/lib/EventPublisher/EventPublisher';
import ItemsEntriesService from '@bigcapital/server/services/Items/ItemsEntriesService';
import TenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import UnitOfWork from '@bigcapital/server/services/UnitOfWork';
import events from '@bigcapital/server/subscribers/events';
import { Knex } from 'knex';
import { Inject, Service } from 'typedi';
import { SaleReceiptDTOTransformer } from './SaleReceiptDTOTransformer';
import { SaleReceiptValidators } from './SaleReceiptValidators';

@Service()
export class EditSaleReceipt {
  @Inject()
  private tenancy: TenancyService;

  @Inject()
  private itemsEntriesService: ItemsEntriesService;

  @Inject()
  private eventPublisher: EventPublisher;

  @Inject()
  private uow: UnitOfWork;

  @Inject()
  private validators: SaleReceiptValidators;

  @Inject()
  private DTOTransformer: SaleReceiptDTOTransformer;

  /**
   * Edit details sale receipt with associated entries.
   * @param {Integer} saleReceiptId
   * @param {ISaleReceipt} saleReceipt
   * @return {void}
   */
  public async editSaleReceipt(tenantId: number, saleReceiptId: number, saleReceiptDTO: any) {
    const { SaleReceipt, Contact } = this.tenancy.models(tenantId);

    // Retrieve sale receipt or throw not found service error.
    const oldSaleReceipt = await SaleReceipt.query().findById(saleReceiptId).withGraphFetched('entries');

    // Validates the sale receipt existance.
    this.validators.validateReceiptExistance(oldSaleReceipt);

    // Retrieves the payment customer model.
    const paymentCustomer = await Contact.query()
      .findById(saleReceiptDTO.customerId)
      .modify('customer')
      .throwIfNotFound();

    // Transform sale receipt DTO to model.
    const saleReceiptObj = await this.DTOTransformer.transformDTOToModel(
      tenantId,
      saleReceiptDTO,
      paymentCustomer,
      oldSaleReceipt,
    );
    // Validate receipt deposit account existance and type.
    await this.validators.validateReceiptDepositAccountExistance(tenantId, saleReceiptDTO.depositAccountId);
    // Validate items IDs existance on the storage.
    await this.itemsEntriesService.validateItemsIdsExistance(tenantId, saleReceiptDTO.entries);
    // Validate the sellable items.
    await this.itemsEntriesService.validateNonSellableEntriesItems(tenantId, saleReceiptDTO.entries);
    // Validate sale receipt number uniuqiness.
    if (saleReceiptDTO.receiptNumber) {
      await this.validators.validateReceiptNumberUnique(tenantId, saleReceiptDTO.receiptNumber, saleReceiptId);
    }
    // Edits the sale receipt tranasctions with associated transactions under UOW env.
    return this.uow.withTransaction(tenantId, async (trx: Knex.Transaction) => {
      // Triggers `onSaleReceiptsEditing` event.
      await this.eventPublisher.emitAsync(events.saleReceipt.onEditing, {
        tenantId,
        oldSaleReceipt,
        saleReceiptDTO,
        trx,
      } as ISaleReceiptEditingPayload);

      // Upsert the receipt graph to the storage.
      const saleReceipt = await SaleReceipt.query(trx).upsertGraphAndFetch({
        id: saleReceiptId,
        ...saleReceiptObj,
      });
      // Triggers `onSaleReceiptEdited` event.
      await this.eventPublisher.emitAsync(events.saleReceipt.onEdited, {
        tenantId,
        oldSaleReceipt,
        saleReceipt,
        saleReceiptId,
        trx,
      } as ISaleReceiptEditedPayload);

      return saleReceipt;
    });
  }
}
