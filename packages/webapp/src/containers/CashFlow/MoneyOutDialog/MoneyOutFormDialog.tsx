import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';

import TransactionNumberDialog from '@bigcapital/webapp/containers/Dialogs/TransactionNumberDialog';

/**
 * Money out form dialog.
 */
export default function MoneyOutFormDialog() {
  const { setFieldValue } = useFormikContext();
  // Update the form once the transaction number form submit confirm.
  const handleTransactionNumberFormConfirm = ({ incrementNumber, manually }) => {
    setFieldValue('transaction_number', incrementNumber || '');
    setFieldValue('transaction_number_manually', manually);
  };

  return (
    <React.Fragment>
      <TransactionNumberDialog dialogName={'transaction-number-form'} onConfirm={handleTransactionNumberFormConfirm} />
    </React.Fragment>
  );
}
