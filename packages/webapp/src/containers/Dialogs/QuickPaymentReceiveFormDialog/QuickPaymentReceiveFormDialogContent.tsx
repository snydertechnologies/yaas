// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/pages/PaymentReceive/QuickPaymentReceiveDialog.scss';

import QuickPaymentReceiveForm from './QuickPaymentReceiveForm';
import { QuickPaymentReceiveFormProvider } from './QuickPaymentReceiveFormProvider';

/**
 * Quick payment receive form dialog content.
 */
export default function QuickPaymentReceiveFormDialogContent({
  // #ownProps
  dialogName,
  invoice,
}) {
  return (
    <QuickPaymentReceiveFormProvider invoiceId={invoice} dialogName={dialogName}>
      <QuickPaymentReceiveForm />
    </QuickPaymentReceiveFormProvider>
  );
}
