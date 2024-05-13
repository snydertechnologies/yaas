import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { Intent } from '@blueprintjs/core';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { defaultTo, isEmpty } from 'lodash';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import { useHistory } from 'react-router-dom';
import { CreateCreditNoteFormSchema, EditCreditNoteFormSchema } from './CreditNoteForm.schema';

import CreditNoteFloatingActions from './CreditNoteFloatingActions';
import CreditNoteFormDialogs from './CreditNoteFormDialogs';
import CreditNoteFormFooter from './CreditNoteFormFooter';
import CreditNoteFormHeader from './CreditNoteFormHeader';
import CreditNoteFormTopBar from './CreditNoteFormTopBar';
import CreditNoteItemsEntriesEditorField from './CreditNoteItemsEntriesEditorField';

import { AppToaster } from '@bigcapital/webapp/components';

import { useCreditNoteFormContext } from './CreditNoteFormProvider';
import { defaultCreditNote, filterNonZeroEntries, transformFormValuesToRequest, transformToEditForm } from './utils';

import { compose, orderingLinesIndexes, safeSumBy, transactionNumber } from '@bigcapital/webapp/utils';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import { CreditNoteExchangeRateSync, CreditNoteSyncIncrementSettingsToForm } from './components';

/**
 * Credit note form.
 */
function CreditNoteForm({
  // #withSettings
  creditAutoIncrement,
  creditNumberPrefix,
  creditNextNumber,
  creditCustomerNotes,
  creditTermsConditions,

  // #withCurrentOrganization
  organization: { base_currency },
}) {
  const history = useHistory();

  // Credit note form context.
  const { isNewMode, submitPayload, creditNote, newCreditNote, createCreditNoteMutate, editCreditNoteMutate } =
    useCreditNoteFormContext();

  // Credit number.
  const creditNumber = transactionNumber(creditNumberPrefix, creditNextNumber);

  // Initial values.
  const initialValues = {
    ...(!isEmpty(creditNote)
      ? { ...transformToEditForm(creditNote) }
      : {
          ...defaultCreditNote,
          ...(creditAutoIncrement && {
            credit_note_number: creditNumber,
          }),
          entries: orderingLinesIndexes(defaultCreditNote.entries),
          currency_code: base_currency,
          terms_conditions: defaultTo(creditTermsConditions, ''),
          note: defaultTo(creditCustomerNotes, ''),
          ...newCreditNote,
        }),
  };

  // Handles form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
    const entries = filterNonZeroEntries(values.entries);
    const totalQuantity = safeSumBy(entries, 'quantity');

    if (totalQuantity === 0) {
      AppToaster.show({
        message: intl.get('quantity_cannot_be_zero_or_empty'),
        intent: Intent.DANGER,
      });
      setSubmitting(false);
      return;
    }
    const form = {
      ...transformFormValuesToRequest(values),
      open: submitPayload.open,
    };
    // Handle the request success.
    const onSuccess = () => {
      AppToaster.show({
        message: intl.get(isNewMode ? 'credit_note.success_message' : 'credit_note.edit_success_message'),
        intent: Intent.SUCCESS,
      });
      setSubmitting(false);

      if (submitPayload.redirect) {
        history.push('/credit-notes');
      }
      if (submitPayload.resetForm) {
        resetForm();
      }
    };
    // Handle the request error.
    const onError = ({
      response: {
        data: { errors },
      },
    }) => {
      setSubmitting(false);
    };
    if (isNewMode) {
      createCreditNoteMutate(form).then(onSuccess).catch(onError);
    } else {
      editCreditNoteMutate([creditNote.id, form]).then(onSuccess).catch(onError);
    }
  };

  return (
    <div className={classNames(CLASSES.PAGE_FORM, CLASSES.PAGE_FORM_STRIP_STYLE, CLASSES.PAGE_FORM_CREDIT_NOTE)}>
      <Formik
        validationSchema={isNewMode ? CreateCreditNoteFormSchema : EditCreditNoteFormSchema}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <CreditNoteFormTopBar />
          <CreditNoteFormHeader />
          <CreditNoteItemsEntriesEditorField />
          <CreditNoteFormFooter />
          <CreditNoteFloatingActions />

          {/*-------- Dialogs --------*/}
          <CreditNoteFormDialogs />

          {/*-------- Effects --------*/}
          <CreditNoteSyncIncrementSettingsToForm />
          <CreditNoteExchangeRateSync />
        </Form>
      </Formik>
    </div>
  );
}
export default compose(
  withSettings(({ creditNoteSettings }) => ({
    creditAutoIncrement: creditNoteSettings?.autoIncrement,
    creditNextNumber: creditNoteSettings?.nextNumber,
    creditNumberPrefix: creditNoteSettings?.numberPrefix,
    creditCustomerNotes: creditNoteSettings?.customerNotes,
    creditTermsConditions: creditNoteSettings?.termsConditions,
  })),
  withCurrentOrganization(),
)(CreditNoteForm);
