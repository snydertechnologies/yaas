import { PaymentReceiveEntry } from '@bigcapital/server/models';
import TenantRepository from '@bigcapital/server/repositories/TenantRepository';

export default class PaymentReceiveEntryRepository extends TenantRepository {
  /**
   * Gets the repository's model.
   */
  get model() {
    return PaymentReceiveEntry.bindKnex(this.knex);
  }
}
