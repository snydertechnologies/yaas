import ClearingAllLinesAlert from '@bigcapital/webapp/containers/Alerts/PaymentReceives/ClearingAllLinesAlert';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import { clearAllPaymentEntries } from './utils';

/**
 * Payment receive form alerts.
 */
export default function PaymentReceiveFormAlerts() {
  const {
    values: { entries },
    setFieldValue,
  } = useFormikContext();

  const handleClearingAllLines = () => {
    const newEntries = clearAllPaymentEntries(entries);
    setFieldValue('entries', newEntries);
    setFieldValue('full_amount', '');
  };

  return (
    <>
      <ClearingAllLinesAlert name={'clear-all-lines-payment-receive'} onConfirm={handleClearingAllLines} />
    </>
  );
}
