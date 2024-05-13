import { SaleInvoice } from '@bigcapital/server/models';
import TenantRepository from '@bigcapital/server/repositories/TenantRepository';
import moment from 'moment';

export default class SaleInvoiceRepository extends TenantRepository {
  /**
   * Gets the repository's model.
   */
  get model() {
    return SaleInvoice.bindKnex(this.knex);
  }

  dueInvoices(asDate = moment().format('YYYY-MM-DD'), withRelations) {
    return this.model
      .query()
      .modify('dueInvoices')
      .modify('notOverdue', asDate)
      .modify('fromDate', asDate)
      .withGraphFetched(withRelations);
  }

  overdueInvoices(asDate = moment().format('YYYY-MM-DD'), withRelations) {
    return this.model
      .query()
      .modify('dueInvoices')
      .modify('overdue', asDate)
      .modify('fromDate', asDate)
      .withGraphFetched(withRelations);
  }
}
