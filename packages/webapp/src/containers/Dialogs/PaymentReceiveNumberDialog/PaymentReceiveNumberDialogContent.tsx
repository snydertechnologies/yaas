// @ts-nocheck
import React, { useCallback } from 'react';
import intl from 'react-intl-universal';

import { DialogContent } from '@bigcapital/webapp/components';
import { useSaveSettings, useSettingsPaymentReceives } from '@bigcapital/webapp/hooks/query';

import ReferenceNumberForm from '@bigcapital/webapp/containers/JournalNumber/ReferenceNumberForm';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import withSettingsActions from '@bigcapital/webapp/containers/Settings/withSettingsActions';

import { transformFormToSettings, transformSettingsToForm } from '@bigcapital/webapp/containers/JournalNumber/utils';
import { compose, saveInvoke } from '@bigcapital/webapp/utils';

/**
 * Payment receive number dialog's content.
 */
function PaymentNumberDialogContent({
  // #withSettings
  nextNumber,
  numberPrefix,
  autoIncrement,

  // #withDialogActions
  closeDialog,

  // #ownProps
  onConfirm,
  initialValues,
}) {
  const [referenceFormValues, setReferenceFormValues] = React.useState(null);

  const { isLoading: isSettingsLoading } = useSettingsPaymentReceives();
  const { mutateAsync: saveSettingsMutate } = useSaveSettings();

  const initialFormValues = {
    ...transformSettingsToForm({
      nextNumber,
      numberPrefix,
      autoIncrement,
    }),
    ...initialValues,
  };

  // Handle submit form.
  const handleSubmitForm = (values, { setSubmitting }) => {
    // Transformes the form values to settings to save it.
    const options = transformFormToSettings(values, 'payment_receives');

    const handleSuccess = () => {
      setSubmitting(false);
      closeDialog('payment-receive-number-form');

      saveInvoke(onConfirm, values);
    };
    const handleErrors = () => {
      setSubmitting(false);
    };
    if (values.incrementMode === 'manual-transaction') {
      handleSuccess();
      return;
    }
    saveSettingsMutate({ options }).then(handleSuccess).catch(handleErrors);
  };

  const handleClose = useCallback(() => {
    closeDialog('payment-receive-number-form');
  }, [closeDialog]);

  // Handle form change.
  const handleChange = (values) => {
    setReferenceFormValues(values);
  };

  // Description.
  const description =
    referenceFormValues?.incrementMode === 'auto'
      ? intl.get('payment_receive.auto_increment.auto')
      : intl.get('payment_receive.auto_increment.manually');

  return (
    <DialogContent isLoading={isSettingsLoading}>
      <ReferenceNumberForm
        initialValues={initialFormValues}
        onSubmit={handleSubmitForm}
        onClose={handleClose}
        onChange={handleChange}
        description={description}
      />
    </DialogContent>
  );
}

export default compose(
  withDialogActions,
  withSettingsActions,
  withSettings(({ paymentReceiveSettings }) => ({
    nextNumber: paymentReceiveSettings?.nextNumber,
    numberPrefix: paymentReceiveSettings?.numberPrefix,
    autoIncrement: paymentReceiveSettings?.autoIncrement,
  })),
)(PaymentNumberDialogContent);
