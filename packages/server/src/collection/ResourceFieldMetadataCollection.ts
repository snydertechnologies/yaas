import MetableCollection from '@bigcapital/server/lib/Metable/MetableCollection';
import ResourceFieldMetadata from '@bigcapital/server/models/ResourceFieldMetadata';

export default class ResourceFieldMetadataCollection extends MetableCollection {
  /**
   * Constructor method.
   */
  constructor() {
    super();

    this.setModel(ResourceFieldMetadata);
    this.extraColumns = ['resource_id', 'resource_item_id'];
  }
}
