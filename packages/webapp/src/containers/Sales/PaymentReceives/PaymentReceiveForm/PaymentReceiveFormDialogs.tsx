import PaymentReceiveNumberDialog from '@bigcapital/webapp/containers/Dialogs/PaymentReceiveNumberDialog';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';

/**
 * Payment receive form dialogs.
 */
export default function PaymentReceiveFormDialogs() {
  const { setFieldValue } = useFormikContext();

  const handleUpdatePaymentNumber = (settings) => {
    // Set the payment transaction no. that cames from dialog to the form.
    // the `payment_receive_no_manually` will be empty except the increment mode is not auto.
    setFieldValue('payment_receive_no', settings.transactionNumber);
    setFieldValue('payment_receive_no_manually', '');

    if (settings.incrementMode !== 'auto') {
      setFieldValue('payment_receive_no_manually', settings.transactionNumber);
    }
  };

  return (
    <PaymentReceiveNumberDialog dialogName={'payment-receive-number-form'} onConfirm={handleUpdatePaymentNumber} />
  );
}
