import TenantModel from '@bigcapital/server/models/TenantModel';
import { Model } from 'objection';

export default class BillLandedCostEntry extends TenantModel {
  /**
   * Table name
   */
  static get tableName() {
    return 'bill_located_cost_entries';
  }

  /**
   * Relationship mapping.
   */
  static get relationMappings() {
    const ItemEntry = require('@bigcapital/server/models/ItemEntry');

    return {
      itemEntry: {
        relation: Model.BelongsToOneRelation,
        modelClass: ItemEntry.default,
        join: {
          from: 'bill_located_cost_entries.entryId',
          to: 'items_entries.id',
        },
        filter(builder) {
          builder.where('reference_type', 'Bill');
        },
      },
    };
  }
}
