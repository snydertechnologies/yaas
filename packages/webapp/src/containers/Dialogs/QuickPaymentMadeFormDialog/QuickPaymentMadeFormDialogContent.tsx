// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/pages/PaymentReceive/QuickPaymentReceiveDialog.scss';

import QuickPaymentMadeForm from './QuickPaymentMadeForm';
import { QuickPaymentMadeFormProvider } from './QuickPaymentMadeFormProvider';

/**
 * Quick payment made form dialog content.
 */
export default function QuickPaymentMadeFormDialogContent({
  // #ownProps
  dialogName,
  bill,
}) {
  return (
    <QuickPaymentMadeFormProvider billId={bill} dialogName={dialogName}>
      <QuickPaymentMadeForm />
    </QuickPaymentMadeFormProvider>
  );
}
