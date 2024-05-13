import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import ReceiptNumberDialog from '@bigcapital/webapp/containers/Dialogs/ReceiptNumberDialog';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import ReceiptFormMailDeliverDialog from './Dialogs/ReceiptFormMailDeliverDialog';

/**
 * Receipt form dialogs.
 */
export default function ReceiptFormDialogs() {
  const { setFieldValue } = useFormikContext();

  // Update the form once the receipt number form submit confirm.
  const handleReceiptNumberFormConfirm = (settings) => {
    // Set the receipt transaction no. that cames from dialog to the form.
    // the `receipt_no_manually` will be empty except the increment mode is not auto.
    setFieldValue('receipt_number', settings.transactionNumber);
    setFieldValue('receipt_number_manually', '');

    if (settings.incrementMode !== 'auto') {
      setFieldValue('receipt_number_manually', settings.transactionNumber);
    }
  };

  return (
    <>
      <ReceiptNumberDialog dialogName={'receipt-number-form'} onConfirm={handleReceiptNumberFormConfirm} />
      <ReceiptFormMailDeliverDialog dialogName={DialogsName.ReceiptFormMailDeliver} />
    </>
  );
}
