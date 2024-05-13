import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import { omit } from 'lodash';
import moment from 'moment';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { AppToaster } from '@bigcapital/webapp/components';
import { CreateRefundCreditNoteFormSchema } from './RefundCreditNoteForm.schema';
import RefundCreditNoteFormContent from './RefundCreditNoteFormContent';
import { useRefundCreditNoteContext } from './RefundCreditNoteFormProvider';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';

const defaultInitialValues = {
  from_account_id: '',
  date: moment(new Date()).format('YYYY-MM-DD'),
  reference_no: '',
  description: '',
  amount: '',
  exchange_rate: 1,
};

/**
 * Refund credit note form.
 */
function RefundCreditNoteForm({
  // #withDialogActions
  closeDialog,
}) {
  const { dialogName, creditNote, createRefundCreditNoteMutate } = useRefundCreditNoteContext();

  // Initial form values
  const initialValues = {
    ...defaultInitialValues,
    ...creditNote,
  };

  // Handles the form submit.
  const handleFormSubmit = (values, { setSubmitting }) => {
    const form = {
      ...omit(values, ['currency_code', 'credits_remaining']),
    };

    // Handle request response success.
    const onSaved = (response) => {
      AppToaster.show({
        message: intl.get('refund_credit_note.dialog.success_message'),
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
    createRefundCreditNoteMutate([creditNote.id, form]).then(onSaved).catch(onError);
  };

  return (
    <Formik
      validationSchema={CreateRefundCreditNoteFormSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      component={RefundCreditNoteFormContent}
    />
  );
}
export default compose(withDialogActions)(RefundCreditNoteForm);
