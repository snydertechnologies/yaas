import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import '@bigcapital/webapp/style/pages/TransactionsLocking/TransactionsLockingDialog.scss';

import { AppToaster } from '@bigcapital/webapp/components';
import { CreateUnlockingTransactionsFormSchema } from './UnlockingTransactionsForm.schema';

import UnlockingTransactionsFormContent from './UnlockingTransactionsFormContent';
import { useUnlockingTransactionsContext } from './UnlockingTransactionsFormProvider';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';

const defaultInitialValues = {
  module: '',
  reason: '',
};

/**
 * Unlocking transactions form.
 */
function UnlockingTransactionsForm({
  // #withDialogActions
  closeDialog,
}) {
  const { dialogName, moduleName, cancelLockingTransactionMutate, cancelUnLockingPartialTransactionMutate } =
    useUnlockingTransactionsContext();

  // Initial form values.
  const initialValues = {
    ...defaultInitialValues,
    module: moduleName,
  };

  // Handles the form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);

    // Handle request response success.
    const onSuccess = (response) => {
      AppToaster.show({
        message: intl.get('unlocking_transactions.dialog.success_message'),
        intent: Intent.SUCCESS,
      });
      closeDialog(dialogName);
    };

    // Handle request response errors.
    const onError = ({
      response: {
        data: { errors },
      },
    }) => {
      setSubmitting(false);
    };

    cancelLockingTransactionMutate(values).then(onSuccess).catch(onError);
  };

  return (
    <Formik
      validationSchema={CreateUnlockingTransactionsFormSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      component={UnlockingTransactionsFormContent}
    />
  );
}
export default compose(withDialogActions)(UnlockingTransactionsForm);
