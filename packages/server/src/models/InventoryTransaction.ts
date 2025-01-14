import TenantModel from '@bigcapital/server/models/TenantModel';
import { getTransactionTypeLabel } from '@bigcapital/server/utils/transactions-types';
import { castArray } from 'lodash';
import moment from 'moment';
import { Model, raw } from 'objection';

export default class InventoryTransaction extends TenantModel {
  transactionId: number;
  transactionType: string;

  /**
   * Table name
   */
  static get tableName() {
    return 'inventory_transactions';
  }

  /**
   * Model timestamps.
   */
  get timestamps() {
    return ['createdAt', 'updatedAt'];
  }

  /**
   * Retrieve formatted reference type.
   * @return {string}
   */
  get transcationTypeFormatted() {
    return getTransactionTypeLabel(this.transactionType);
  }

  /**
   * Model modifiers.
   */
  static get modifiers() {
    return {
      filterDateRange(query, startDate, endDate, type = 'day') {
        const dateFormat = 'YYYY-MM-DD';
        const fromDate = moment(startDate).startOf(type).format(dateFormat);
        const toDate = moment(endDate).endOf(type).format(dateFormat);

        if (startDate) {
          query.where('date', '>=', fromDate);
        }
        if (endDate) {
          query.where('date', '<=', toDate);
        }
      },

      itemsTotals(builder) {
        builder.select('itemId');
        builder.sum('rate as rate');
        builder.sum('quantity as quantity');
        builder.select(raw('SUM(`QUANTITY` * `RATE`) as COST'));
        builder.groupBy('itemId');
      },

      INDirection(builder) {
        builder.where('direction', 'IN');
      },

      OUTDirection(builder) {
        builder.where('direction', 'OUT');
      },

      /**
       * Filters transactions by the given branches.
       */
      filterByBranches(query, branchesIds) {
        const formattedBranchesIds = castArray(branchesIds);

        query.whereIn('branch_id', formattedBranchesIds);
      },

      /**
       * Filters transactions by the given warehosues.
       */
      filterByWarehouses(query, warehousesIds) {
        const formattedWarehousesIds = castArray(warehousesIds);

        query.whereIn('warehouse_id', formattedWarehousesIds);
      },
    };
  }

  /**
   * Relationship mapping.
   */
  static get relationMappings() {
    const Item = require('@bigcapital/server/models/Item');
    const ItemEntry = require('@bigcapital/server/models/ItemEntry');
    const InventoryTransactionMeta = require('@bigcapital/server/models/InventoryTransactionMeta');
    const InventoryCostLots = require('@bigcapital/server/models/InventoryCostLotTracker');

    return {
      // Transaction meta.
      meta: {
        relation: Model.HasOneRelation,
        modelClass: InventoryTransactionMeta.default,
        join: {
          from: 'inventory_transactions.id',
          to: 'inventory_transaction_meta.inventoryTransactionId',
        },
      },
      // Item cost aggregated.
      itemCostAggregated: {
        relation: Model.HasOneRelation,
        modelClass: InventoryCostLots.default,
        join: {
          from: 'inventory_transactions.itemId',
          to: 'inventory_cost_lot_tracker.itemId',
        },
        filter(query) {
          query.select('itemId');
          query.sum('cost as cost');
          query.sum('quantity as quantity');
          query.groupBy('itemId');
        },
      },
      costLotAggregated: {
        relation: Model.HasOneRelation,
        modelClass: InventoryCostLots.default,
        join: {
          from: 'inventory_transactions.id',
          to: 'inventory_cost_lot_tracker.inventoryTransactionId',
        },
        filter(query) {
          query.sum('cost as cost');
          query.sum('quantity as quantity');
          query.groupBy('inventoryTransactionId');
        },
      },
      item: {
        relation: Model.BelongsToOneRelation,
        modelClass: Item.default,
        join: {
          from: 'inventory_transactions.itemId',
          to: 'items.id',
        },
      },
      itemEntry: {
        relation: Model.BelongsToOneRelation,
        modelClass: ItemEntry.default,
        join: {
          from: 'inventory_transactions.entryId',
          to: 'items_entries.id',
        },
      },
    };
  }
}
