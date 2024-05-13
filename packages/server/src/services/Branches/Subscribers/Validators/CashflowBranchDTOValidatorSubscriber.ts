import { ICommandCashflowCreatingPayload } from '@bigcapital/server/interfaces';
import events from '@bigcapital/server/subscribers/events';
import { Inject, Service } from 'typedi';
import { ValidateBranchExistance } from '../../Integrations/ValidateBranchExistance';

@Service()
export class CashflowBranchDTOValidatorSubscriber {
  @Inject()
  private validateBranchExistance: ValidateBranchExistance;

  /**
   * Attaches events with handlers.
   */
  public attach = (bus) => {
    bus.subscribe(events.cashflow.onTransactionCreating, this.validateBranchExistanceOnCashflowTransactionCreating);
    return bus;
  };

  /**
   * Validate branch existance once cashflow transaction creating.
   * @param {ICommandCashflowCreatingPayload} payload
   */
  private validateBranchExistanceOnCashflowTransactionCreating = async ({
    tenantId,
    newTransactionDTO,
  }: ICommandCashflowCreatingPayload) => {
    await this.validateBranchExistance.validateTransactionBranchWhenActive(tenantId, newTransactionDTO.branchId);
  };
}
