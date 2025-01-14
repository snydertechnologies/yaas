import TenantModel from '@bigcapital/server/models/TenantModel';
import { Model } from 'objection';

export default class Warehouse extends TenantModel {
  /**
   * Table name.
   */
  static get tableName() {
    return 'warehouses_transfers_entries';
  }

  /**
   * Virtual attributes.
   */
  static get virtualAttributes() {
    return ['total'];
  }

  /**
   * Invoice amount in local currency.
   * @returns {number}
   */
  get total() {
    return this.cost * this.quantity;
  }

  /**
   * Relationship mapping.
   */
  static get relationMappings() {
    const Item = require('@bigcapital/server/models/Item');

    return {
      item: {
        relation: Model.BelongsToOneRelation,
        modelClass: Item.default,
        join: {
          from: 'warehouses_transfers_entries.itemId',
          to: 'items.id',
        },
      },
    };
  }
}
