import TenantModel from '@bigcapital/server/models/TenantModel';
import { Model } from 'objection';

export default class BillPaymentEntry extends TenantModel {
  /**
   * Table name
   */
  static get tableName() {
    return 'bills_payments_entries';
  }

  /**
   * Timestamps columns.
   */
  get timestamps() {
    return [];
  }

  /**
   * Relationship mapping.
   */
  static get relationMappings() {
    const Bill = require('@bigcapital/server/models/Bill');
    const BillPayment = require('@bigcapital/server/models/BillPayment');

    return {
      payment: {
        relation: Model.BelongsToOneRelation,
        modelClass: BillPayment.default,
        join: {
          from: 'bills_payments_entries.billPaymentId',
          to: 'bills_payments.id',
        },
      },
      bill: {
        relation: Model.BelongsToOneRelation,
        modelClass: Bill.default,
        join: {
          from: 'bills_payments_entries.billId',
          to: 'bills.id',
        },
      },
    };
  }
}
