// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/pages/BadDebt/BadDebtDialog.scss';
import BadDebtForm from './BadDebtForm';
import { BadDebtFormProvider } from './BadDebtFormProvider';

/**
 * Bad debt  dialog content.
 */
export default function BadDebtDialogContent({
  // #ownProps
  dialogName,
  invoice,
}) {
  return (
    <BadDebtFormProvider invoiceId={invoice} dialogName={dialogName}>
      <BadDebtForm />
    </BadDebtFormProvider>
  );
}
