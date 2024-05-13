import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import * as R from 'ramda';
// @ts-nocheck
import React, { useEffect } from 'react';
import intl from 'react-intl-universal';

import { AppToaster } from '@bigcapital/webapp/components';
import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import { PreferencesInvoiceFormSchema } from './PreferencesInvoiceForm.schema';
import { PreferencesInvoicesForm } from './PreferencesInvoicesForm';

import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import { useSaveSettings } from '@bigcapital/webapp/hooks/query';
import { compose, transformToForm, transfromToSnakeCase } from '@bigcapital/webapp/utils';
import { transferObjectOptionsToArray } from '../Accountant/utils';

const defaultValues = {
  termsConditions: '',
  customerNotes: '',
};

/**
 * Preferences - Invoices.
 */
function PreferencesInvoiceFormPage({
  // #withDashboardActions
  changePreferencesPageTitle,

  // #withSettings
  invoiceSettings,
}) {
  // Save settings.
  const { mutateAsync: saveSettingMutate } = useSaveSettings();

  useEffect(() => {
    changePreferencesPageTitle(intl.get('preferences.invoices'));
  }, [changePreferencesPageTitle]);

  // Initial values.
  const initialValues = {
    ...defaultValues,
    ...transformToForm(invoiceSettings, defaultValues),
  };
  // Handle the form submit.
  const handleFormSubmit = (values, { setSubmitting }) => {
    const options = R.compose(transferObjectOptionsToArray, transfromToSnakeCase)({ salesInvoices: { ...values } });

    // Handle request success.
    const onSuccess = () => {
      AppToaster.show({
        message: intl.get('preferences.invoices.success_message'),
        intent: Intent.SUCCESS,
      });
      setSubmitting(false);
    };
    // Handle request error.
    const onError = () => {
      setSubmitting(false);
    };
    saveSettingMutate({ options }).then(onSuccess).catch(onError);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PreferencesInvoiceFormSchema}
      onSubmit={handleFormSubmit}
      component={PreferencesInvoicesForm}
    />
  );
}

export default compose(
  withDashboardActions,
  withSettings(({ invoiceSettings }) => ({
    invoiceSettings: invoiceSettings,
  })),
)(PreferencesInvoiceFormPage);
