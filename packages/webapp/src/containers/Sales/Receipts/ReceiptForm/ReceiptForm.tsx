import { Intent } from '@blueprintjs/core';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { isEmpty, sumBy } from 'lodash';
// @ts-nocheck
import intl from 'react-intl-universal';
import { useHistory } from 'react-router-dom';

import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { CreateReceiptFormSchema, EditReceiptFormSchema } from './ReceiptForm.schema';

import { useReceiptFormContext } from './ReceiptFormProvider';

import ReceiptFormDialogs from './ReceiptFormDialogs';
import ReceiptFormFloatingActions from './ReceiptFormFloatingActions';
import ReceiptFormFooter from './ReceiptFormFooter';
import ReceiptFromHeader from './ReceiptFormHeader';
import ReceiptFormTopBar from './ReceiptFormTopbar';
import ReceiptItemsEntriesEditor from './ReceiptItemsEntriesEditor';

import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';

import { AppToaster } from '@bigcapital/webapp/components';
import { compose, orderingLinesIndexes, transactionNumber } from '@bigcapital/webapp/utils';
import { ReceiptSyncAutoExRateToForm, ReceiptSyncIncrementSettingsToForm } from './components';
import {
  defaultReceipt,
  handleErrors,
  resetFormState,
  transformFormValuesToRequest,
  transformToEditForm,
} from './utils';

/**
 * Receipt form.
 */
function ReceiptForm({
  // #withSettings
  receiptNextNumber,
  receiptNumberPrefix,
  receiptAutoIncrement,
  receiptTermsConditions,
  receiptMessage,
  preferredDepositAccount,

  // #withCurrentOrganization
  organization: { base_currency },
}) {
  const history = useHistory();

  // Receipt form context.
  const { receipt, editReceiptMutate, createReceiptMutate, submitPayload, isNewMode } = useReceiptFormContext();

  // The next receipt number.
  const nextReceiptNumber = transactionNumber(receiptNumberPrefix, receiptNextNumber);
  // Initial values in create and edit mode.
  const initialValues = {
    ...(!isEmpty(receipt)
      ? { ...transformToEditForm(receipt) }
      : {
          ...defaultReceipt,
          ...(receiptAutoIncrement && {
            receipt_number: nextReceiptNumber,
          }),
          deposit_account_id: parseInt(preferredDepositAccount),
          entries: orderingLinesIndexes(defaultReceipt.entries),
          currency_code: base_currency,
          receipt_message: receiptMessage,
          terms_conditions: receiptTermsConditions,
        }),
  };
  // Handle the form submit.
  const handleFormSubmit = (values, { setErrors, setSubmitting, resetForm }) => {
    const entries = values.entries.filter((item) => item.item_id && item.quantity);
    const totalQuantity = sumBy(entries, (entry) => parseInt(entry.quantity));

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
      closed: submitPayload.status,
    };
    // Handle the request success.
    const onSuccess = (response) => {
      AppToaster.show({
        message: intl.get(
          isNewMode ? 'the_receipt_has_been_created_successfully' : 'the_receipt_has_been_edited_successfully',
          { number: values.receipt_number },
        ),
        intent: Intent.SUCCESS,
      });
      setSubmitting(false);

      if (submitPayload.redirect) {
        history.push('/receipts');
      }
      if (submitPayload.resetForm) {
        resetFormState();
      }
    };

    // Handle the request error.
    const onError = ({
      response: {
        data: { errors },
      },
    }) => {
      if (errors) {
        handleErrors(errors, { setErrors });
      }
      setSubmitting(false);
    };
    if (!isNewMode) {
      editReceiptMutate([receipt.id, form]).then(onSuccess).catch(onError);
    } else {
      createReceiptMutate(form).then(onSuccess).catch(onError);
    }
  };

  return (
    <div className={classNames(CLASSES.PAGE_FORM, CLASSES.PAGE_FORM_STRIP_STYLE, CLASSES.PAGE_FORM_RECEIPT)}>
      <Formik
        validationSchema={isNewMode ? CreateReceiptFormSchema : EditReceiptFormSchema}
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <ReceiptFormTopBar />
          <ReceiptFromHeader />
          <ReceiptItemsEntriesEditor />
          <ReceiptFormFooter />
          <ReceiptFormFloatingActions />

          {/*---------- Dialogs ---------*/}
          <ReceiptFormDialogs />

          {/*---------- Effects ---------*/}
          <ReceiptSyncIncrementSettingsToForm />
          <ReceiptSyncAutoExRateToForm />
        </Form>
      </Formik>
    </div>
  );
}

export default compose(
  withDashboardActions,
  withSettings(({ receiptSettings }) => ({
    receiptNextNumber: receiptSettings?.nextNumber,
    receiptNumberPrefix: receiptSettings?.numberPrefix,
    receiptAutoIncrement: receiptSettings?.autoIncrement,
    receiptMessage: receiptSettings?.receiptMessage,
    receiptTermsConditions: receiptSettings?.termsConditions,
    preferredDepositAccount: receiptSettings?.preferredDepositAccount,
  })),
  withCurrentOrganization(),
)(ReceiptForm);
