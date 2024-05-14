import { ICreditNoteCreatingPayload, ICreditNoteEditingPayload } from '@bigcapital/libs-backend';
import events from '@bigcapital/server/subscribers/events';
import { Inject, Service } from 'typedi';
import { WarehousesDTOValidators } from '../../../Integrations/WarehousesDTOValidators';

@Service()
export class CreditNoteWarehousesValidateSubscriber {
  @Inject()
  warehouseDTOValidator: WarehousesDTOValidators;

  /**
   * Attaches events with handlers.
   */
  public attach(bus) {
    bus.subscribe(events.creditNote.onCreating, this.validateCreditNoteWarehouseExistanceOnCreating);
    bus.subscribe(events.creditNote.onEditing, this.validateCreditNoteWarehouseExistanceOnEditing);
    return bus;
  }

  /**
   * Validate warehouse existance of sale invoice once creating.
   * @param {ICreditNoteCreatingPayload}
   */
  private validateCreditNoteWarehouseExistanceOnCreating = async ({
    creditNoteDTO,
    tenantId,
  }: ICreditNoteCreatingPayload) => {
    await this.warehouseDTOValidator.validateDTOWarehouseWhenActive(tenantId, creditNoteDTO);
  };

  /**
   * Validate warehouse existance of sale invoice once editing.
   * @param {ICreditNoteEditingPayload}
   */
  private validateCreditNoteWarehouseExistanceOnEditing = async ({
    tenantId,
    creditNoteEditDTO,
  }: ICreditNoteEditingPayload) => {
    await this.warehouseDTOValidator.validateDTOWarehouseWhenActive(tenantId, creditNoteEditDTO);
  };
}
