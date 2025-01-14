import { ISaleInvoice } from '@bigcapital/libs-backend';
import { TransformerInjectable } from '@bigcapital/server/lib/Transformer/TransformerInjectable';
import { Inject, Service } from 'typedi';
import { CreditNoteAppliedInvoiceTransformer } from './CreditNoteAppliedInvoiceTransformer';
import BaseCreditNotes from './CreditNotes';

@Service()
export default class GetCreditNoteAssociatedAppliedInvoices extends BaseCreditNotes {
  @Inject()
  private transformer: TransformerInjectable;

  /**
   * Retrieve credit note associated invoices to apply.
   * @param {number} tenantId
   * @param {number} creditNoteId
   * @returns {Promise<ISaleInvoice[]>}
   */
  public getCreditAssociatedAppliedInvoices = async (
    tenantId: number,
    creditNoteId: number,
  ): Promise<ISaleInvoice[]> => {
    const { CreditNoteAppliedInvoice } = this.tenancy.models(tenantId);

    // Retireve credit note or throw not found service error.
    const creditNote = await this.getCreditNoteOrThrowError(tenantId, creditNoteId);
    const appliedToInvoices = await CreditNoteAppliedInvoice.query()
      .where('credit_note_id', creditNoteId)
      .withGraphFetched('saleInvoice')
      .withGraphFetched('creditNote');

    // Transformes credit note applied to invoices.
    return this.transformer.transform(tenantId, appliedToInvoices, new CreditNoteAppliedInvoiceTransformer());
  };
}
