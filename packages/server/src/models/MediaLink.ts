import TenantModel from '@bigcapital/server/models/TenantModel';

export default class MediaLink extends TenantModel {
  /**
   * Table name
   */
  static get tableName() {
    return 'media_links';
  }
}
