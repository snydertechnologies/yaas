import TenantModel from '@bigcapital/server/models/TenantModel';
import { Model } from 'objection';

export default class ManualJournalEntry extends TenantModel {
  /**
   * Table name.
   */
  static get tableName() {
    return 'manual_journals_entries';
  }

  /**
   * Model timestamps.
   */
  get timestamps() {
    return [];
  }

  /**
   * Relationship mapping.
   */
  static get relationMappings() {
    const Account = require('@bigcapital/server/models/Account');
    const Contact = require('@bigcapital/server/models/Contact');
    const Branch = require('@bigcapital/server/models/Branch');

    return {
      account: {
        relation: Model.BelongsToOneRelation,
        modelClass: Account.default,
        join: {
          from: 'manual_journals_entries.accountId',
          to: 'accounts.id',
        },
      },
      contact: {
        relation: Model.BelongsToOneRelation,
        modelClass: Contact.default,
        join: {
          from: 'manual_journals_entries.contactId',
          to: 'contacts.id',
        },
      },
      branch: {
        relation: Model.BelongsToOneRelation,
        modelClass: Branch.default,
        join: {
          from: 'manual_journals_entries.branchId',
          to: 'branches.id',
        },
      },
    };
  }
}
