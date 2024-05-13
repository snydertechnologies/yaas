import TenantModel from '@bigcapital/server/models/TenantModel';
import { Model, mixin } from 'objection';
import CustomViewBaseModel from './CustomViewBaseModel';
import ModelSearchable from './ModelSearchable';
import ModelSetting from './ModelSetting';

export default class RefundCreditNote extends mixin(TenantModel, [ModelSetting, CustomViewBaseModel, ModelSearchable]) {
  /**
   * Table name.
   */
  static get tableName() {
    return 'refund_credit_note_transactions';
  }

  /**
   * Timestamps columns.
   */
  get timestamps() {
    return ['created_at', 'updated_at'];
  }

  /*
   * Relationship mapping.
   */
  static get relationMappings() {
    const Account = require('@bigcapital/server/models/Account');
    const CreditNote = require('@bigcapital/server/models/CreditNote');

    return {
      fromAccount: {
        relation: Model.BelongsToOneRelation,
        modelClass: Account.default,
        join: {
          from: 'refund_credit_note_transactions.fromAccountId',
          to: 'accounts.id',
        },
      },
      creditNote: {
        relation: Model.BelongsToOneRelation,
        modelClass: CreditNote.default,
        join: {
          from: 'refund_credit_note_transactions.creditNoteId',
          to: 'credit_notes.id',
        },
      },
    };
  }
}
