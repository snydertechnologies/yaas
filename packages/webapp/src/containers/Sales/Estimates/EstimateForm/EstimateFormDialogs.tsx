import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import EstimateNumberDialog from '@bigcapital/webapp/containers/Dialogs/EstimateNumberDialog';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import EstimateFormMailDeliverDialog from './Dialogs/EstimateFormMailDeliverDialog';

/**
 * Estimate form dialogs.
 */
export default function EstimateFormDialogs() {
  const { setFieldValue } = useFormikContext();

  // Update the form once the estimate number form submit confirm.
  const handleEstimateNumberFormConfirm = (settings) => {
    setFieldValue('estimate_number', settings.transactionNumber);
    setFieldValue('estimate_number_manually', '');

    if (settings.incrementMode !== 'auto') {
      setFieldValue('estimate_number_manually', settings.transactionNumber);
    }
  };

  return (
    <>
      <EstimateNumberDialog dialogName={'estimate-number-form'} onConfirm={handleEstimateNumberFormConfirm} />
      <EstimateFormMailDeliverDialog dialogName={DialogsName.EstimateFormMailDeliver} />
    </>
  );
}
