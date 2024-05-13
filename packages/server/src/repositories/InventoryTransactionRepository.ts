import { InventoryTransaction } from '@bigcapital/server/models';
import TenantRepository from '@bigcapital/server/repositories/TenantRepository';

export default class InventoryTransactionRepository extends TenantRepository {
  /**
   * Gets the repository's model.
   */
  get model() {
    return InventoryTransaction.bindKnex(this.knex);
  }
}
