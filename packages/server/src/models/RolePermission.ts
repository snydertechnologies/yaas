import TenantModel from '@bigcapital/server/models/TenantModel';
import { Model, mixin } from 'objection';
import CustomViewBaseModel from './CustomViewBaseModel';
import ModelSearchable from './ModelSearchable';
import ModelSetting from './ModelSetting';

export default class RolePermission extends mixin(TenantModel, [ModelSetting, CustomViewBaseModel, ModelSearchable]) {
  /**
   * Table name
   */
  static get tableName() {
    return 'role_permissions';
  }

  /**
   * Relationship mapping.
   */
  static get relationMappings() {
    const Role = require('@bigcapital/server/models/Role');

    return {
      /**
       *
       */
      role: {
        relation: Model.BelongsToOneRelation,
        modelClass: Role.default,
        join: {
          from: 'role_permissions.roleId',
          to: 'roles.id',
        },
      },
    };
  }
}
