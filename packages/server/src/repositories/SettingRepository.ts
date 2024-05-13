import Setting from '@bigcapital/server/models/Setting';
import TenantRepository from '@bigcapital/server/repositories/TenantRepository';

export default class SettingRepository extends TenantRepository {
  /**
   * Gets the repository's model.
   */
  get model() {
    return Setting.bindKnex(this.knex);
  }
}
