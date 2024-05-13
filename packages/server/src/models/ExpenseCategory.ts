import TenantModel from '@bigcapital/server/models/TenantModel';
import { Model } from 'objection';

export default class ExpenseCategory extends TenantModel {
  amount: number;

  /**
   * Table name
   */
  static get tableName() {
    return 'expense_transaction_categories';
  }

  /**
   * Virtual attributes.
   */
  static get virtualAttributes() {
    return ['unallocatedCostAmount'];
  }

  /**
   * Remain unallocated landed cost.
   * @return {number}
   */
  get unallocatedCostAmount() {
    return Math.max(this.amount - this.allocatedCostAmount, 0);
  }

  /**
   * Relationship mapping.
   */
  static get relationMappings() {
    const Account = require('@bigcapital/server/models/Account');

    return {
      expenseAccount: {
        relation: Model.BelongsToOneRelation,
        modelClass: Account.default,
        join: {
          from: 'expense_transaction_categories.expenseAccountId',
          to: 'accounts.id',
        },
      },
    };
  }
}
