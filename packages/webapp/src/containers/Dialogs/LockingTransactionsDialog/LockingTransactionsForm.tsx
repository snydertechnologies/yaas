import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import moment from 'moment';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import '@bigcapital/webapp/style/pages/TransactionsLocking/TransactionsLockingDialog.scss';

import { AppToaster } from '@bigcapital/webapp/components';
import { CreateLockingTransactionsFormSchema } from './LockingTransactionsForm.schema';

import LockingTransactionsFormContent from './LockingTransactionsFormContent';
import { useLockingTransactionsContext } from './LockingTransactionsFormProvider';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose, transformToForm } from '@bigcapital/webapp/utils';

const defaultInitialValues = {
  module: '',
  lock_to_date: moment(new Date()).format('YYYY-MM-DD'),
  reason: '',
};

/**
 * Locking Transactions Form.
 */
function LockingTransactionsForm({
  // #withDialogActions
  closeDialog,
}) {
  const { dialogName, moduleName, transactionLocking, isEnabled, createLockingTransactionMutate } =
    useLockingTransactionsContext();

  // Initial form values.
  const initialValues = React.useMemo(
    () => ({
      ...(isEnabled
        ? {
            ...transformToForm(transactionLocking, defaultInitialValues),
            module: moduleName,
          }
        : {
            ...defaultInitialValues,
            module: moduleName,
          }),
    }),
    [isEnabled],
  );

  // Handles the form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);

    // Handle request response success.
    const onSuccess = (response) => {
      AppToaster.show({
        message: intl.get('locking_transactions.dialog.success_message'),
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

    createLockingTransactionMutate(values).then(onSuccess).catch(onError);
  };

  return (
    <Formik
      validationSchema={CreateLockingTransactionsFormSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      component={LockingTransactionsFormContent}
    />
  );
}
export default compose(withDialogActions)(LockingTransactionsForm);
