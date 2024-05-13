import TenantModel from '@bigcapital/server/models/TenantModel';
import { Model } from 'objection';

export default class View extends TenantModel {
  /**
   * Table name.
   */
  static get tableName() {
    return 'views';
  }

  /**
   * Model timestamps.
   */
  get timestamps() {
    return ['createdAt', 'updatedAt'];
  }

  static get modifiers() {
    const TABLE_NAME = View.tableName;

    return {
      allMetadata(query) {
        query.withGraphFetched('roles.field');
        query.withGraphFetched('columns');
      },

      specificOrFavourite(query, viewId) {
        if (viewId) {
          query.where('id', viewId);
        } else {
          query.where('favourite', true);
        }
        return query;
      },
    };
  }

  /**
   * Relationship mapping.
   */
  static get relationMappings() {
    const ViewColumn = require('@bigcapital/server/models/ViewColumn');
    const ViewRole = require('@bigcapital/server/models/ViewRole');

    return {
      /**
       * View model may has many columns.
       */
      columns: {
        relation: Model.HasManyRelation,
        modelClass: ViewColumn.default,
        join: {
          from: 'views.id',
          to: 'view_has_columns.viewId',
        },
      },

      /**
       * View model may has many view roles.
       */
      roles: {
        relation: Model.HasManyRelation,
        modelClass: ViewRole.default,
        join: {
          from: 'views.id',
          to: 'view_roles.viewId',
        },
      },
    };
  }
}
