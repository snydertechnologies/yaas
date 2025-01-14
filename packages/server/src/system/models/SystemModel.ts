import BaseModel from '@bigcapital/server/models/Model';
import { Container } from 'typedi';

export default class SystemModel extends BaseModel {
  /**
   * Loging all system database queries.
   * @param  {...any} args
   */
  static query(...args) {
    const Logger = Container.get('logger');
    return super.query(...args).onBuildKnex((knexQueryBuilder) => {
      knexQueryBuilder.on('query', (queryData) => {
        Logger.info(`[query][system] ${queryData.sql}`, {
          bindings: queryData.bindings,
        });
      });
    });
  }
}
