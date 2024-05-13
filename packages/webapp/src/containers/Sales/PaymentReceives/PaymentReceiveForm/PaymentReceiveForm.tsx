import { Intent } from '@blueprintjs/core';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import { defaultTo, isEmpty, sumBy } from 'lodash';
// @ts-nocheck
import React, { useMemo } from 'react';
import intl from 'react-intl-universal';
import { useHistory } from 'react-router-dom';

import '@bigcapital/webapp/style/pages/PaymentReceive/PageForm.scss';

import { CLASSES } from '@bigcapital/webapp/constants/classes';
import PaymentReceiveFloatingActions from './PaymentReceiveFloatingActions';
import PaymentReceiveFormAlerts from './PaymentReceiveFormAlerts';
import PaymentReceiveFormBody from './PaymentReceiveFormBody';
import PaymentReceiveFormDialogs from './PaymentReceiveFormDialogs';
import PaymentReceiveFormFooter from './PaymentReceiveFormFooter';
import PaymentReceiveHeader from './PaymentReceiveFormHeader';
import PaymentReceiveFormTopBar from './PaymentReceiveFormTopBar';
import { PaymentReceiveInnerProvider } from './PaymentReceiveInnerProvider';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';

import { AppToaster } from '@bigcapital/webapp/components';
import { compose, transactionNumber } from '@bigcapital/webapp/utils';
import { CreatePaymentReceiveFormSchema, EditPaymentReceiveFormSchema } from './PaymentReceiveForm.schema';

import { usePaymentReceiveFormContext } from './PaymentReceiveFormProvider';
import { PaymentReceiveSyncIncrementSettingsToForm } from './components';
import {
  defaultPaymentReceive,
  resetFormState,
  transformErrors,
  transformFormToRequest,
  transformToEditForm,
} from './utils';

/**
 * Payment Receive form.
 */
function PaymentReceiveForm({
  // #withSettings
  preferredDepositAccount,
  paymentReceiveNextNumber,
  paymentReceiveNumberPrefix,
  paymentReceiveAutoIncrement,

  // #withCurrentOrganization
  organization: { base_currency },
}) {
  const history = useHistory();

  // Payment receive form context.
  const {
    isNewMode,
    paymentReceiveEditPage,
    paymentEntriesEditPage,
    paymentReceiveId,
    submitPayload,
    editPaymentReceiveMutate,
    createPaymentReceiveMutate,
  } = usePaymentReceiveFormContext();

  // Payment receive number.
  const nextPaymentNumber = transactionNumber(paymentReceiveNumberPrefix, paymentReceiveNextNumber);
  // Form initial values.
  const initialValues = useMemo(
    () => ({
      ...(!isEmpty(paymentReceiveEditPage)
        ? transformToEditForm(paymentReceiveEditPage, paymentEntriesEditPage)
        : {
            ...defaultPaymentReceive,
            // If the auto-increment mode is enabled, take the next payment
            // number from the settings.
            ...(paymentReceiveAutoIncrement && {
              payment_receive_no: nextPaymentNumber,
            }),
            deposit_account_id: defaultTo(preferredDepositAccount, ''),
            currency_code: base_currency,
          }),
    }),
    [
      paymentReceiveEditPage,
      nextPaymentNumber,
      paymentEntriesEditPage,
      paymentReceiveAutoIncrement,
      preferredDepositAccount,
    ],
  );

  // Handle form submit.
  const handleSubmitForm = (values, { setSubmitting, resetForm, setFieldError }) => {
    setSubmitting(true);

    // Calculates the total payment amount of entries.
    const totalPaymentAmount = sumBy(values.entries, 'payment_amount');

    if (totalPaymentAmount <= 0) {
      AppToaster.show({
        message: intl.get('you_cannot_make_payment_with_zero_total_amount'),
        intent: Intent.DANGER,
      });
      setSubmitting(false);
      return;
    }
    // Transformes the form values to request body.
    const form = transformFormToRequest(values);

    // Handle request response success.
    const onSaved = () => {
      setSubmitting(false);
      AppToaster.show({
        message: intl.get(
          paymentReceiveId
            ? 'the_payment_receive_transaction_has_been_edited'
            : 'the_payment_receive_transaction_has_been_created',
        ),
        intent: Intent.SUCCESS,
      });

      if (submitPayload.redirect) {
        history.push('/payment-receives');
      }
      if (submitPayload.resetForm) {
        resetFormState({ resetForm, initialValues, values });
      }
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

    if (paymentReceiveId) {
      editPaymentReceiveMutate([paymentReceiveId, form]).then(onSaved).catch(onError);
    } else {
      createPaymentReceiveMutate(form).then(onSaved).catch(onError);
    }
  };
  return (
    <div className={classNames(CLASSES.PAGE_FORM, CLASSES.PAGE_FORM_STRIP_STYLE, CLASSES.PAGE_FORM_PAYMENT_RECEIVE)}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        validationSchema={isNewMode ? CreatePaymentReceiveFormSchema : EditPaymentReceiveFormSchema}
      >
        <Form>
          <PaymentReceiveInnerProvider>
            <PaymentReceiveFormTopBar />
            <PaymentReceiveHeader />
            <PaymentReceiveFormBody />
            <PaymentReceiveFormFooter />
            <PaymentReceiveFloatingActions />

            {/* ------- Effects ------- */}
            <PaymentReceiveSyncIncrementSettingsToForm />

            {/* ------- Alerts & Dialogs ------- */}
            <PaymentReceiveFormAlerts />
            <PaymentReceiveFormDialogs />
          </PaymentReceiveInnerProvider>
        </Form>
      </Formik>
    </div>
  );
}

export default compose(
  withSettings(({ paymentReceiveSettings }) => ({
    paymentReceiveSettings,
    paymentReceiveNextNumber: paymentReceiveSettings?.nextNumber,
    paymentReceiveNumberPrefix: paymentReceiveSettings?.numberPrefix,
    paymentReceiveAutoIncrement: paymentReceiveSettings?.autoIncrement,
    preferredDepositAccount: paymentReceiveSettings?.preferredDepositAccount,
  })),
  withCurrentOrganization(),
)(PaymentReceiveForm);
