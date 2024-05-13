import MetableStoreDB from '@bigcapital/server/lib/Metable/MetableStoreDB';

export default class SettingsStore extends MetableStoreDB {
  /**
   * Constructor method.
   * @param {number} tenantId
   */
  constructor(repository) {
    super();
    this.setExtraColumns(['group']);
    this.setRepository(repository);
  }
}
