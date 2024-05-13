import { IInventoryAdjustmentCreatingPayload } from '@bigcapital/server/interfaces';
import events from '@bigcapital/server/subscribers/events';
import { Inject, Service } from 'typedi';
import { ValidateBranchExistance } from '../../Integrations/ValidateBranchExistance';

@Service()
export class InventoryAdjustmentBranchValidateSubscriber {
  @Inject()
  private validateBranchExistance: ValidateBranchExistance;

  /**
   * Attaches events with handlers.
   */
  public attach = (bus) => {
    bus.subscribe(events.inventoryAdjustment.onQuickCreating, this.validateBranchExistanceOnInventoryCreating);
    return bus;
  };

  /**
   * Validate branch existance on invoice creating.
   * @param {ISaleInvoiceCreatingPaylaod} payload
   */
  private validateBranchExistanceOnInventoryCreating = async ({
    tenantId,
    quickAdjustmentDTO,
  }: IInventoryAdjustmentCreatingPayload) => {
    await this.validateBranchExistance.validateTransactionBranchWhenActive(tenantId, quickAdjustmentDTO.branchId);
  };
}
