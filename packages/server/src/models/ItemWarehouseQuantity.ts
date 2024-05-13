import TenantModel from '@bigcapital/server/models/TenantModel';
import { Model } from 'objection';

export default class ItemWarehouseQuantity extends TenantModel {
  /**
   * Table name.
   */
  static get tableName() {
    return 'items_warehouses_quantity';
  }

  static get relationMappings() {
    const Item = require('@bigcapital/server/models/Item');
    const Warehouse = require('@bigcapital/server/models/Warehouse');

    return {
      item: {
        relation: Model.BelongsToOneRelation,
        modelClass: Item.default,
        join: {
          from: 'items_warehouses_quantity.itemId',
          to: 'items.id',
        },
      },
      warehouse: {
        relation: Model.BelongsToOneRelation,
        modelClass: Warehouse.default,
        join: {
          from: 'items_warehouses_quantity.warehouseId',
          to: 'warehouses.id',
        },
      },
    };
  }
}
