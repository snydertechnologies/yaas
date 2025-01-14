import TenantModel from '@bigcapital/server/models/TenantModel';
import { Model, mixin } from 'objection';
import CustomViewBaseModel from './CustomViewBaseModel';
import ModelSearchable from './ModelSearchable';
import ModelSetting from './ModelSetting';

export default class VendorCreditAppliedBill extends mixin(TenantModel, [
  ModelSetting,
  CustomViewBaseModel,
  ModelSearchable,
]) {
  /**
   * Table name
   */
  static get tableName() {
    return 'vendor_credit_applied_bill';
  }

  /**
   * Timestamps columns.
   */
  get timestamps() {
    return ['created_at', 'updated_at'];
  }

  /**
   * Relationship mapping.
   */
  static get relationMappings() {
    const Bill = require('@bigcapital/server/models/Bill');
    const VendorCredit = require('@bigcapital/server/models/VendorCredit');

    return {
      bill: {
        relation: Model.BelongsToOneRelation,
        modelClass: Bill.default,
        join: {
          from: 'vendor_credit_applied_bill.billId',
          to: 'bills.id',
        },
      },

      vendorCredit: {
        relation: Model.BelongsToOneRelation,
        modelClass: VendorCredit.default,
        join: {
          from: 'vendor_credit_applied_bill.vendorCreditId',
          to: 'vendor_credits.id',
        },
      },
    };
  }
}
