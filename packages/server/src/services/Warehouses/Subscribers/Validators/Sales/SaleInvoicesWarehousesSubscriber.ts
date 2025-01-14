import { ISaleInvoiceCreatingPaylaod, ISaleInvoiceEditingPayload } from '@bigcapital/libs-backend';
import events from '@bigcapital/server/subscribers/events';
import { Inject, Service } from 'typedi';
import { WarehousesDTOValidators } from '../../../Integrations/WarehousesDTOValidators';

@Service()
export class SaleInvoicesWarehousesValidateSubscriber {
  @Inject()
  warehousesDTOValidator: WarehousesDTOValidators;

  /**
   * Attaches events with handlers.
   */
  public attach(bus) {
    bus.subscribe(events.saleInvoice.onCreating, this.validateSaleInvoiceWarehouseExistanceOnCreating);
    bus.subscribe(events.saleInvoice.onEditing, this.validateSaleInvoiceWarehouseExistanceOnEditing);
    return bus;
  }

  /**
   * Validate warehouse existance of sale invoice once creating.
   * @param {ISaleInvoiceCreatingPaylaod}
   */
  private validateSaleInvoiceWarehouseExistanceOnCreating = async ({
    saleInvoiceDTO,
    tenantId,
  }: ISaleInvoiceCreatingPaylaod) => {
    await this.warehousesDTOValidator.validateDTOWarehouseWhenActive(tenantId, saleInvoiceDTO);
  };

  /**
   * Validate warehouse existance of sale invoice once editing.
   * @param {ISaleInvoiceEditingPayload}
   */
  private validateSaleInvoiceWarehouseExistanceOnEditing = async ({
    tenantId,
    saleInvoiceDTO,
  }: ISaleInvoiceEditingPayload) => {
    await this.warehousesDTOValidator.validateDTOWarehouseWhenActive(tenantId, saleInvoiceDTO);
  };
}
