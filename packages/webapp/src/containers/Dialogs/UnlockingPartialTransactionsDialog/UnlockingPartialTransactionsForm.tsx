import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import moment from 'moment';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import '@bigcapital/webapp/style/pages/TransactionsLocking/TransactionsLockingDialog.scss';

import { AppToaster } from '@bigcapital/webapp/components';
import { CreateUnLockingPartialTransactionsFormSchema } from './UnlockingPartialTransactionsForm.schema';

import UnlockingPartialTransactionsFormContent from './UnlockingPartialTransactionsFormContent';
import { useUnlockingPartialTransactionsContext } from './UnlockingPartialTransactionsFormProvider';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';

const defaultInitialValues = {
  module: '',
  unlock_from_date: moment(new Date()).format('YYYY-MM-DD'),
  unlock_to_date: moment(new Date()).format('YYYY-MM-DD'),
  reason: '',
};

/**
 * Partial Unlocking transactions form.
 */
function UnlockingPartialTransactionsForm({
  // #withDialogActions
  closeDialog,
}) {
  const { dialogName, moduleName, createUnlockingPartialTransactionsMutate } = useUnlockingPartialTransactionsContext();

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
        message: intl.get('unlocking_partial_transactions.dialog.success_message'),
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

    createUnlockingPartialTransactionsMutate(values).then(onSuccess).catch(onError);
  };

  return (
    <Formik
      validationSchema={CreateUnLockingPartialTransactionsFormSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      component={UnlockingPartialTransactionsFormContent}
    />
  );
}

export default compose(withDialogActions)(UnlockingPartialTransactionsForm);
