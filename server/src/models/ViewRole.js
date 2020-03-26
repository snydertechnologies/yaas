import { Model } from 'objection';
import BaseModel from '@/models/Model';

export default class ViewRole extends BaseModel {

  /**
   * Virtual attributes.
   */
  static get virtualAttributes() {
    return ['comparators'];
  }

  static get comparators() {
    return [
      'equals', 'not_equal', 'contains', 'not_contain',
    ];
  }

  /**
   * Table name.
   */
  static get tableName() {
    return 'view_roles';
  }

  /**
   * Timestamp columns.
   */
  static get hasTimestamps() {
    return false;
  }

  /**
   * Relationship mapping.
   */
  static get relationMappings() {
    const ResourceField = require('@/models/ResourceField');
    const View = require('@/models/View');

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

      /**
       * View role model may belongs to resource field model.
       */
      field: {
        relation: Model.BelongsToOneRelation,
        modelClass: ResourceField.default,
        join: {
          from: 'view_roles.fieldId',
          to: 'resource_fields.id',
        },
      },
    };
  }
}