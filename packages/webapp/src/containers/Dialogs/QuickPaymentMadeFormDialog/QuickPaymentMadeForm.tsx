import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import { pick } from 'lodash';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { AppToaster } from '@bigcapital/webapp/components';
import { CreateQuickPaymentMadeFormSchema } from './QuickPaymentMade.schema';
import QuickPaymentMadeFormContent from './QuickPaymentMadeFormContent';
import { useQuickPaymentMadeContext } from './QuickPaymentMadeFormProvider';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';
import { defaultPaymentMade, transformErrors } from './utils';

/**
 * Quick payment made form.
 */
function QuickPaymentMadeForm({
  // #withDialogActions
  closeDialog,
}) {
  const { bill, dialogName, createPaymentMadeMutate } = useQuickPaymentMadeContext();

  // Initial form values
  const initialValues = {
    ...defaultPaymentMade,
    ...bill,
  };

  // Handles the form submit.
  const handleFormSubmit = (values, { setSubmitting, setFieldError }) => {
    const entries = [values]
      .filter((entry) => entry.id && entry.payment_amount)
      .map((entry) => ({
        bill_id: entry.id,
        ...pick(entry, ['payment_amount']),
      }));

    const form = {
      ...values,
      vendor_id: values?.vendor?.id,
      entries,
    };

    // Handle request response success.
    const onSuccess = () => {
      AppToaster.show({
        message: intl.get('the_payment_made_has_been_created_successfully'),
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
      if (errors) {
        transformErrors(errors, { setFieldError });
      }
      setSubmitting(false);
    };
    createPaymentMadeMutate(form).then(onSuccess).catch(onError);
  };

  return (
    <Formik
      validationSchema={CreateQuickPaymentMadeFormSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      component={QuickPaymentMadeFormContent}
    />
  );
}

export default compose(withDialogActions)(QuickPaymentMadeForm);
