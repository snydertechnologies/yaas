import TenantModel from '@bigcapital/server/models/TenantModel';
import { Model } from 'objection';

export default class PaymentReceiveEntry extends TenantModel {
  /**
   * Table name
   */
  static get tableName() {
    return 'payment_receives_entries';
  }

  /**
   * Timestamps columns.
   */
  get timestamps() {
    return [];
  }

  /**
   * Relationship mapping.
   */
  static get relationMappings() {
    const PaymentReceive = require('@bigcapital/server/models/PaymentReceive');
    const SaleInvoice = require('@bigcapital/server/models/SaleInvoice');

    return {
      /**
       */
      payment: {
        relation: Model.BelongsToOneRelation,
        modelClass: PaymentReceive.default,
        join: {
          from: 'payment_receives_entries.paymentReceiveId',
          to: 'payment_receives.id',
        },
      },

      /**
       * The payment receive entry have have sale invoice.
       */
      invoice: {
        relation: Model.BelongsToOneRelation,
        modelClass: SaleInvoice.default,
        join: {
          from: 'payment_receives_entries.invoiceId',
          to: 'sales_invoices.id',
        },
      },
    };
  }
}
