import { ManualJournal } from '@bigcapital/server/models';
import TenantRepository from '@bigcapital/server/repositories/TenantRepository';

export default class JournalRepository extends TenantRepository {
  /**
   * Gets the repository's model.
   */
  get model() {
    return ManualJournal.bindKnex(this.knex);
  }
}
