import { ServiceError } from '@bigcapital/server/exceptions';
import TenancyService from '@bigcapital/server/services/Tenancy/TenancyService';
import { Inject, Service } from 'typedi';
import { ERRORS } from './constants';

@Service()
export default class DeleteCustomerLinkedCreidtNote {
  @Inject()
  tenancy: TenancyService;

  /**
   * Validate the given customer has no linked credit note transactions.
   * @param {number} tenantId
   * @param {number} creditNoteId
   */
  public validateCustomerHasNoCreditTransaction = async (tenantId: number, customerId: number) => {
    const { CreditNote } = this.tenancy.models(tenantId);

    const associatedCredits = await CreditNote.query().where('customerId', customerId);
    if (associatedCredits.length > 0) {
      throw new ServiceError(ERRORS.CUSTOMER_HAS_LINKED_CREDIT_NOTES);
    }
  };
}
