import SessionQueryBuilder from '@bigcapital/server/services/SessionModel/SessionQueryBuilder';

export default class SessionModel {
  /**
   * Constructor method.
   * @param {Object} options -
   */
  constructor(options) {
    this.options = { ...options, ...SessionModel.defaultOptions };
  }

  static get defaultOptions() {
    return {
      setModifiedBy: true,
      setModifiedAt: true,
      setCreatedBy: true,
      setCreatedAt: true,
    };
  }

  static get QueryBuilder() {
    return SessionQueryBuilder;
  }
}
