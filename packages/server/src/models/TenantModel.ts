import BaseModel from '@bigcapital/server/models/Model';
import { Container } from 'typedi';

export default class TenantModel extends BaseModel {
  /**
   * Logging all tenant databases queries.
   * @param  {...any} args
   */
  static query(...args) {
    const Logger = Container.get('logger');

    return super.query(...args).onBuildKnex((knexQueryBuilder) => {
      const {
        userParams: { tenantId },
      } = knexQueryBuilder.client.config;

      knexQueryBuilder.on('query', (queryData) => {
        Logger.info(`[query][tenant] ${queryData.sql}`, {
          bindings: queryData.bindings,
          tenantId,
        });
      });
    });
  }
}
