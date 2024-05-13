import { IBranchesActivatedPayload } from '@bigcapital/server/interfaces';
import events from '@bigcapital/server/subscribers/events';
import { Inject, Service } from 'typedi';
import { SaleInvoiceActivateBranches } from '../../Integrations/Sales/SaleInvoiceBranchesActivate';

@Service()
export class SaleInvoicesActivateBranchesSubscriber {
  @Inject()
  private invoicesActivateBranches: SaleInvoiceActivateBranches;

  /**
   * Attaches events with handlers.
   */
  public attach(bus) {
    bus.subscribe(events.branch.onActivated, this.updateInvoicesWithBranchOnActivated);
    return bus;
  }

  /**
   * Updates accounts transactions with the primary branch once
   * the multi-branches is activated.
   * @param {IBranchesActivatedPayload}
   */
  private updateInvoicesWithBranchOnActivated = async ({ tenantId, primaryBranch, trx }: IBranchesActivatedPayload) => {
    await this.invoicesActivateBranches.updateInvoicesWithBranch(tenantId, primaryBranch.id, trx);
  };
}
