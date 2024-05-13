import { Contact } from '@bigcapital/server/models';
import TenantRepository from '@bigcapital/server/repositories/TenantRepository';

export default class ContactRepository extends TenantRepository {
  /**
   * Gets the repository's model.
   */
  get model() {
    return Contact.bindKnex(this.knex);
  }
}
