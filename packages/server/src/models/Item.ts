import TenantModel from '@bigcapital/server/models/TenantModel';
import { DEFAULT_VIEWS } from '@bigcapital/server/services/Items/constants';
import { Model, mixin } from 'objection';
import CustomViewBaseModel from './CustomViewBaseModel';
// import { buildFilterQuery } from '@bigcapital/server/lib/ViewRolesBuilder';
import ItemSettings from './Item.Settings';
import ModelSearchable from './ModelSearchable';
import ModelSetting from './ModelSetting';

export default class Item extends mixin(TenantModel, [ModelSetting, CustomViewBaseModel, ModelSearchable]) {
  /**
   * Table name
   */
  static get tableName() {
    return 'items';
  }

  /**
   * Model timestamps.
   */
  get timestamps() {
    return ['createdAt', 'updatedAt'];
  }

  /**
   * Allows to mark model as resourceable to viewable and filterable.
   */
  static get resourceable() {
    return true;
  }

  /**
   * Model modifiers.
   */
  static get modifiers() {
    return {
      sortBy(query, columnSort, sortDirection) {
        query.orderBy(columnSort, sortDirection);
      },
      viewRolesBuilder(query, conditions, logicExpression) {
        // buildFilterQuery(Item.tableName, conditions, logicExpression)(query); // @TODO: Inam, uncomment this line
      },

      /**
       * Inactive/Active mode.
       */
      inactiveMode(query, active = false) {
        query.where('items.active', !active);
      },
    };
  }

  /**
   * Relationship mapping.
   */
  static get relationMappings() {
    const Media = require('@bigcapital/server/models/Media');
    const Account = require('@bigcapital/server/models/Account');
    const ItemCategory = require('@bigcapital/server/models/ItemCategory');
    const ItemWarehouseQuantity = require('@bigcapital/server/models/ItemWarehouseQuantity');
    const ItemEntry = require('@bigcapital/server/models/ItemEntry');
    const WarehouseTransferEntry = require('@bigcapital/server/models/WarehouseTransferEntry');
    const InventoryAdjustmentEntry = require('@bigcapital/server/models/InventoryAdjustmentEntry');
    const TaxRate = require('@bigcapital/server/models/TaxRate');

    return {
      /**
       * Item may belongs to cateogory model.
       */
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: ItemCategory.default,
        join: {
          from: 'items.categoryId',
          to: 'items_categories.id',
        },
      },

      /**
       * Item may belongs to cost account.
       */
      costAccount: {
        relation: Model.BelongsToOneRelation,
        modelClass: Account.default,
        join: {
          from: 'items.costAccountId',
          to: 'accounts.id',
        },
      },

      /**
       * Item may belongs to sell account.
       */
      sellAccount: {
        relation: Model.BelongsToOneRelation,
        modelClass: Account.default,
        join: {
          from: 'items.sellAccountId',
          to: 'accounts.id',
        },
      },

      /**
       * Item may belongs to inventory account.
       */
      inventoryAccount: {
        relation: Model.BelongsToOneRelation,
        modelClass: Account.default,
        join: {
          from: 'items.inventoryAccountId',
          to: 'accounts.id',
        },
      },

      /**
       * Item has many warehouses quantities.
       */
      itemWarehouses: {
        relation: Model.HasManyRelation,
        modelClass: ItemWarehouseQuantity.default,
        join: {
          from: 'items.id',
          to: 'items_warehouses_quantity.itemId',
        },
      },

      /**
       * Item may has many item entries.
       */
      itemEntries: {
        relation: Model.HasManyRelation,
        modelClass: ItemEntry.default,
        join: {
          from: 'items.id',
          to: 'items_entries.itemId',
        },
      },

      /**
       * Item may has many warehouses transfers entries.
       */
      warehousesTransfersEntries: {
        relation: Model.HasManyRelation,
        modelClass: WarehouseTransferEntry.default,
        join: {
          from: 'items.id',
          to: 'warehouses_transfers_entries.itemId',
        },
      },

      /**
       * Item has many inventory adjustment entries.
       */
      inventoryAdjustmentsEntries: {
        relation: Model.HasManyRelation,
        modelClass: InventoryAdjustmentEntry.default,
        join: {
          from: 'items.id',
          to: 'inventory_adjustments_entries.itemId',
        },
      },

      /**
       *
       */
      media: {
        relation: Model.ManyToManyRelation,
        modelClass: Media.default,
        join: {
          from: 'items.id',
          through: {
            from: 'media_links.model_id',
            to: 'media_links.media_id',
          },
          to: 'media.id',
        },
      },

      /**
       * Item may has sell tax rate.
       */
      sellTaxRate: {
        relation: Model.BelongsToOneRelation,
        modelClass: TaxRate.default,
        join: {
          from: 'items.sellTaxRateId',
          to: 'tax_rates.id',
        },
      },

      /**
       * Item may has purchase tax rate.
       */
      purchaseTaxRate: {
        relation: Model.BelongsToOneRelation,
        modelClass: TaxRate.default,
        join: {
          from: 'items.purchaseTaxRateId',
          to: 'tax_rates.id',
        },
      },
    };
  }

  /**
   *
   */
  static get secureDeleteRelations() {
    return ['itemEntries', 'inventoryAdjustmentsEntries', 'warehousesTransfersEntries'];
  }

  /**
   * Model settings.
   */
  static get meta() {
    return ItemSettings;
  }

  /**
   * Retrieve the default custom views, roles and columns.
   */
  static get defaultViews() {
    return DEFAULT_VIEWS;
  }

  /**
   * Model search roles.
   */
  static get searchRoles() {
    return [
      { fieldKey: 'name', comparator: 'contains' },
      { condition: 'or', fieldKey: 'code', comparator: 'like' },
    ];
  }
}
