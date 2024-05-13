import TenantModel from '@bigcapital/server/models/TenantModel';
import { getExlusiveTaxAmount, getInclusiveTaxAmount } from '@bigcapital/server/utils/taxRate';
import { Model } from 'objection';

export default class ItemEntry extends TenantModel {
  public taxRate: number;
  public discount: number;
  public quantity: number;
  public rate: number;
  public isInclusiveTax: number;

  /**
   * Table name.
   * @returns {string}
   */
  static get tableName() {
    return 'items_entries';
  }

  /**
   * Timestamps columns.
   * @returns {string[]}
   */
  get timestamps() {
    return ['created_at', 'updated_at'];
  }

  /**
   * Virtual attributes.
   * @returns {string[]}
   */
  static get virtualAttributes() {
    return ['amount', 'taxAmount', 'amountExludingTax', 'amountInclusingTax', 'total'];
  }

  /**
   * Item entry total.
   * Amount of item entry includes tax and subtracted discount amount.
   * @returns {number}
   */
  get total() {
    return this.amountInclusingTax;
  }

  /**
   * Item entry amount.
   * Amount of item entry that may include or exclude tax.
   * @returns {number}
   */
  get amount() {
    return this.quantity * this.rate;
  }

  /**
   * Item entry amount including tax.
   * @returns {number}
   */
  get amountInclusingTax() {
    return this.isInclusiveTax ? this.amount : this.amount + this.taxAmount;
  }

  /**
   * Item entry amount excluding tax.
   * @returns {number}
   */
  get amountExludingTax() {
    return this.isInclusiveTax ? this.amount - this.taxAmount : this.amount;
  }

  /**
   * Discount amount.
   * @returns {number}
   */
  get discountAmount() {
    return this.amount * (this.discount / 100);
  }

  /**
   * Tag rate fraction.
   * @returns {number}
   */
  get tagRateFraction() {
    return this.taxRate / 100;
  }

  /**
   * Tax amount withheld.
   * @returns {number}
   */
  get taxAmount() {
    return this.isInclusiveTax
      ? getInclusiveTaxAmount(this.amount, this.taxRate)
      : getExlusiveTaxAmount(this.amount, this.taxRate);
  }

  static calcAmount(itemEntry) {
    const { discount, quantity, rate } = itemEntry;
    const total = quantity * rate;

    return discount ? total - total * discount * 0.01 : total;
  }

  /**
   * Item entry relations.
   */
  static get relationMappings() {
    const Item = require('@bigcapital/server/models/Item');
    const BillLandedCostEntry = require('@bigcapital/server/models/BillLandedCostEntry');
    const SaleInvoice = require('@bigcapital/server/models/SaleInvoice');
    const Bill = require('@bigcapital/server/models/Bill');
    const SaleReceipt = require('@bigcapital/server/models/SaleReceipt');
    const SaleEstimate = require('@bigcapital/server/models/SaleEstimate');
    const ProjectTask = require('@bigcapital/server/models/Task');
    const Expense = require('@bigcapital/server/models/Expense');
    const TaxRate = require('@bigcapital/server/models/TaxRate');

    return {
      item: {
        relation: Model.BelongsToOneRelation,
        modelClass: Item.default,
        join: {
          from: 'items_entries.itemId',
          to: 'items.id',
        },
      },
      allocatedCostEntries: {
        relation: Model.HasManyRelation,
        modelClass: BillLandedCostEntry.default,
        join: {
          from: 'items_entries.referenceId',
          to: 'bill_located_cost_entries.entryId',
        },
      },

      invoice: {
        relation: Model.BelongsToOneRelation,
        modelClass: SaleInvoice.default,
        join: {
          from: 'items_entries.referenceId',
          to: 'sales_invoices.id',
        },
      },

      bill: {
        relation: Model.BelongsToOneRelation,
        modelClass: Bill.default,
        join: {
          from: 'items_entries.referenceId',
          to: 'bills.id',
        },
      },

      estimate: {
        relation: Model.BelongsToOneRelation,
        modelClass: SaleEstimate.default,
        join: {
          from: 'items_entries.referenceId',
          to: 'sales_estimates.id',
        },
      },

      /**
       * Sale receipt reference.
       */
      receipt: {
        relation: Model.BelongsToOneRelation,
        modelClass: SaleReceipt.default,
        join: {
          from: 'items_entries.referenceId',
          to: 'sales_receipts.id',
        },
      },

      /**
       * Project task reference.
       */
      projectTaskRef: {
        relation: Model.HasManyRelation,
        modelClass: ProjectTask.default,
        join: {
          from: 'items_entries.projectRefId',
          to: 'tasks.id',
        },
      },

      /**
       * Project expense reference.
       */
      projectExpenseRef: {
        relation: Model.HasManyRelation,
        modelClass: Expense.default,
        join: {
          from: 'items_entries.projectRefId',
          to: 'expenses_transactions.id',
        },
      },

      /**
       * Project bill reference.
       */
      projectBillRef: {
        relation: Model.HasManyRelation,
        modelClass: Bill.default,
        join: {
          from: 'items_entries.projectRefId',
          to: 'bills.id',
        },
      },

      /**
       * Tax rate reference.
       */
      tax: {
        relation: Model.HasOneRelation,
        modelClass: TaxRate.default,
        join: {
          from: 'items_entries.taxRateId',
          to: 'tax_rates.id',
        },
      },
    };
  }
}
