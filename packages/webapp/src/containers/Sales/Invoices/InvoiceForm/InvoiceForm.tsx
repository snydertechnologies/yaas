import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { Intent } from '@blueprintjs/core';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { defaultTo, isEmpty, sumBy } from 'lodash';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import { useHistory } from 'react-router-dom';
import { getCreateInvoiceFormSchema, getEditInvoiceFormSchema } from './InvoiceForm.schema';

import InvoiceFloatingActions from './InvoiceFloatingActions';
import InvoiceFormDialogs from './InvoiceFormDialogs';
import InvoiceFormFooter from './InvoiceFormFooter';
import InvoiceFormHeader from './InvoiceFormHeader';
import InvoiceFormTopBar from './InvoiceFormTopBar';
import InvoiceItemsEntriesEditorField from './InvoiceItemsEntriesEditorField';

import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';

import { AppToaster } from '@bigcapital/webapp/components';
import { compose, orderingLinesIndexes, transactionNumber } from '@bigcapital/webapp/utils';
import { InvoiceFormActions } from './InvoiceFormActions';
import { useInvoiceFormContext } from './InvoiceFormProvider';
import { InvoiceExchangeRateSync, InvoiceNoSyncSettingsToForm } from './components';
import { defaultInvoice, resetFormState, transformErrors, transformToEditForm, transformValueToRequest } from './utils';

/**
 * Invoice form.
 */
function InvoiceForm({
  // #withSettings
  invoiceNextNumber,
  invoiceNumberPrefix,
  invoiceAutoIncrementMode,
  invoiceCustomerNotes,
  invoiceTermsConditions,

  // #withCurrentOrganization
  organization: { base_currency },
}) {
  const history = useHistory();

  // Invoice form context.
  const { isNewMode, invoice, estimateId, newInvoice, createInvoiceMutate, editInvoiceMutate, submitPayload } =
    useInvoiceFormContext();

  // Invoice number.
  const invoiceNumber = transactionNumber(invoiceNumberPrefix, invoiceNextNumber);
  // Form initial values.
  const initialValues = {
    ...(!isEmpty(invoice)
      ? { ...transformToEditForm(invoice) }
      : {
          ...defaultInvoice,
          // If the auto-increment mode is enabled, take the next invoice
          // number from the settings.
          ...(invoiceAutoIncrementMode && {
            invoice_no: invoiceNumber,
          }),
          entries: orderingLinesIndexes(defaultInvoice.entries),
          currency_code: base_currency,
          invoice_message: defaultTo(invoiceCustomerNotes, ''),
          terms_conditions: defaultTo(invoiceTermsConditions, ''),
          ...newInvoice,
        }),
  };
  // Handles form submit.
  const handleSubmit = (values, { setSubmitting, setErrors, resetForm }) => {
    setSubmitting(true);

    const entries = values.entries.filter((item) => item.item_id && item.quantity);
    const totalQuantity = sumBy(entries, (entry) => parseInt(entry.quantity));

    // Throw danger toaster in case total quantity equals zero.
    if (totalQuantity === 0) {
      AppToaster.show({
        message: intl.get('quantity_cannot_be_zero_or_empty'),
        intent: Intent.DANGER,
      });
      setSubmitting(false);
      return;
    }
    // Transformes the values of the form to request.
    const form = {
      ...transformValueToRequest(values),
      delivered: submitPayload.deliver,
      from_estimate_id: estimateId,
    };
    // Handle the request success.
    const onSuccess = () => {
      AppToaster.show({
        message: intl.get(
          isNewMode ? 'the_invoice_has_been_created_successfully' : 'the_invoice_has_been_edited_successfully',
          { number: values.invoice_no },
        ),
        intent: Intent.SUCCESS,
      });
      setSubmitting(false);

      if (submitPayload.redirect) {
        history.push('/invoices');
      }
      if (submitPayload.resetForm) {
        resetFormState({ resetForm, initialValues, values });
      }
    };
    // Handle the request error.
    const onError = ({
      response: {
        data: { errors },
      },
    }) => {
      if (errors) {
        transformErrors(errors, { setErrors });
      }
      setSubmitting(false);
    };
    if (!isEmpty(invoice)) {
      editInvoiceMutate([invoice.id, form]).then(onSuccess).catch(onError);
    } else {
      createInvoiceMutate(form).then(onSuccess).catch(onError);
    }
  };
  // Create invoice form schema.
  const CreateInvoiceFormSchema = getCreateInvoiceFormSchema();

  // Edit invoice form schema.
  const EditInvoiceFormSchema = getEditInvoiceFormSchema();

  return (
    <div className={classNames(CLASSES.PAGE_FORM, CLASSES.PAGE_FORM_STRIP_STYLE, CLASSES.PAGE_FORM_INVOICE)}>
      <Formik
        validationSchema={isNewMode ? CreateInvoiceFormSchema : EditInvoiceFormSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Form>
          <InvoiceFormTopBar />
          <InvoiceFormHeader />

          <div className={classNames(CLASSES.PAGE_FORM_BODY)}>
            <InvoiceFormActions />
            <InvoiceItemsEntriesEditorField />
          </div>
          <InvoiceFormFooter />
          <InvoiceFloatingActions />

          {/*---------- Dialogs ----------*/}
          <InvoiceFormDialogs />

          {/*---------- Effects ----------*/}
          <InvoiceNoSyncSettingsToForm />
          <InvoiceExchangeRateSync />
        </Form>
      </Formik>
    </div>
  );
}

export default compose(
  withDashboardActions,
  withSettings(({ invoiceSettings }) => ({
    invoiceNextNumber: invoiceSettings?.nextNumber,
    invoiceNumberPrefix: invoiceSettings?.numberPrefix,
    invoiceAutoIncrementMode: invoiceSettings?.autoIncrement,
    invoiceCustomerNotes: invoiceSettings?.customerNotes,
    invoiceTermsConditions: invoiceSettings?.termsConditions,
  })),
  withCurrentOrganization(),
)(InvoiceForm);
