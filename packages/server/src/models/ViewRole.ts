import TenantModel from '@bigcapital/server/models/TenantModel';
import { Model } from 'objection';

export default class ViewRole extends TenantModel {
  /**
   * Virtual attributes.
   */
  static get virtualAttributes() {
    return ['comparators'];
  }

  static get comparators() {
    return ['equals', 'not_equal', 'contains', 'not_contain'];
  }

  /**
   * Table name.
   */
  static get tableName() {
    return 'view_roles';
  }

  /**
   * Relationship mapping.
   */
  static get relationMappings() {
    const View = require('@bigcapital/server/models/View');

    return {
      /**
       * View role model may belongs to view model.
       */
      view: {
        relation: Model.BelongsToOneRelation,
        modelClass: View.default,
        join: {
          from: 'view_roles.viewId',
          to: 'views.id',
        },
      },
    };
  }
}
