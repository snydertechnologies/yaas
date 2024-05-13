// @ts-nocheck
import React from 'react';
import { useParams } from 'react-router-dom';

import '@bigcapital/webapp/style/pages/SaleInvoice/PageForm.scss';

import { AutoExchangeRateProvider } from '@bigcapital/webapp/containers/Entries/AutoExchangeProvider';
import InvoiceForm from './InvoiceForm';
import { InvoiceFormProvider } from './InvoiceFormProvider';

/**
 * Invoice form page.
 */
export default function InvoiceFormPage() {
  const { id } = useParams();
  const idAsInteger = parseInt(id, 10);

  return (
    <InvoiceFormProvider invoiceId={idAsInteger}>
      <AutoExchangeRateProvider>
        <InvoiceForm />
      </AutoExchangeRateProvider>
    </InvoiceFormProvider>
  );
}
