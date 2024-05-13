import { ServiceError } from '@bigcapital/server/exceptions';
import { ICustomerDeletingPayload } from '@bigcapital/server/interfaces';
import TenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import events from '@bigcapital/server/subscribers/events';
import { Inject, Service } from 'typedi';
import DeleteCustomerLinkedCreidtNote from './DeleteCustomerLinkedCreditNote';

const ERRORS = {
  CUSTOMER_HAS_TRANSACTIONS: 'CUSTOMER_HAS_TRANSACTIONS',
};

@Service()
export default class DeleteCustomerLinkedCreditSubscriber {
  @Inject()
  tenancy: TenancyService;

  @Inject()
  deleteCustomerLinkedCredit: DeleteCustomerLinkedCreidtNote;

  /**
   * Attaches events with handlers.
   * @param bus
   */
  public attach = (bus) => {
    bus.subscribe(events.customers.onDeleting, this.validateCustomerHasNoLinkedCreditsOnDeleting);
  };

  /**
   * Validate vendor has no associated credit transaction once the vendor deleting.
   * @param {IVendorEventDeletingPayload} payload -
   */
  public validateCustomerHasNoLinkedCreditsOnDeleting = async ({ tenantId, customerId }: ICustomerDeletingPayload) => {
    try {
      await this.deleteCustomerLinkedCredit.validateCustomerHasNoCreditTransaction(tenantId, customerId);
    } catch (error) {
      throw new ServiceError(ERRORS.CUSTOMER_HAS_TRANSACTIONS);
    }
  };
}
