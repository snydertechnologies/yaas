import TenantModel from '@bigcapital/server/models/TenantModel';
import { Model } from 'objection';

export default class InventoryTransactionMeta extends TenantModel {
  /**
   * Table name
   */
  static get tableName() {
    return 'inventory_transaction_meta';
  }

  /**
   * Relationship mapping.
   */
  static get relationMappings() {
    const InventoryTransactions = require('@bigcapital/server/models/InventoryTransaction');

    return {
      inventoryTransaction: {
        relation: Model.BelongsToOneRelation,
        modelClass: InventoryTransactions.default,
        join: {
          from: 'inventory_transaction_meta.inventoryTransactionId',
          to: 'inventory_transactions.inventoryTransactionId',
        },
      },
    };
  }
}
