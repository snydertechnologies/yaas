import { View } from '@bigcapital/server/models';
import TenantRepository from '@bigcapital/server/repositories/TenantRepository';

export default class ViewRepository extends TenantRepository {
  /**
   * Gets the repository's model.
   */
  get model() {
    return View.bindKnex(this.knex);
  }

  /**
   * Retrieve all views of the given resource id.
   */
  allByResource(resourceModel: string, withRelations?) {
    return super.find({ resource_model: resourceModel }, withRelations);
  }
}
