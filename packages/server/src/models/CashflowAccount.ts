import AccountTypesUtils from '@bigcapital/server/lib/AccountTypes';
import TenantModel from '@bigcapital/server/models/TenantModel';
import { DEFAULT_VIEWS } from '@bigcapital/server/services/Accounts/constants';
import { castArray } from 'lodash';
import { Model, mixin } from 'objection';
import CashflowAccountSettings from './CashflowAccount.Settings';
import CustomViewBaseModel from './CustomViewBaseModel';
import ModelSearchable from './ModelSearchable';
import ModelSettings from './ModelSetting';

export default class CashflowAccount extends mixin(TenantModel, [ModelSettings, CustomViewBaseModel, ModelSearchable]) {
  /**
   * Table name.
   */
  static get tableName() {
    return 'accounts';
  }

  /**
   * Timestamps columns.
   */
  static get timestamps() {
    return ['createdAt', 'updatedAt'];
  }

  /**
   * Virtual attributes.
   */
  static get virtualAttributes() {
    return ['accountTypeLabel'];
  }

  /**
   * Retrieve account type label.
   */
  get accountTypeLabel() {
    return AccountTypesUtils.getType(this.accountType, 'label');
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
      /**
       * Inactive/Active mode.
       */
      inactiveMode(query, active = false) {
        query.where('accounts.active', !active);
      },
    };
  }

  /**
   * Relationship mapping.
   */
  static get relationMappings() {
    const AccountTransaction = require('@bigcapital/server/models/AccountTransaction');

    return {
      /**
       * Account model may has many transactions.
       */
      transactions: {
        relation: Model.HasManyRelation,
        modelClass: AccountTransaction.default,
        join: {
          from: 'accounts.id',
          to: 'accounts_transactions.accountId',
        },
      },
    };
  }

  /**
   * Detarmines whether the given type equals the account type.
   * @param {string} accountType
   * @return {boolean}
   */
  isAccountType(accountType) {
    const types = castArray(accountType);
    return types.indexOf(this.accountType) !== -1;
  }

  /**
   * Detarmine whether the given parent type equals the account type.
   * @param {string} parentType
   * @return {boolean}
   */
  isParentType(parentType) {
    return AccountTypesUtils.isParentTypeEqualsKey(this.accountType, parentType);
  }

  /**
   * Model settings.
   */
  static get meta() {
    return CashflowAccountSettings;
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
      { condition: 'or', fieldKey: 'name', comparator: 'contains' },
      { condition: 'or', fieldKey: 'code', comparator: 'like' },
    ];
  }
}
