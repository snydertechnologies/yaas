import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import * as R from 'ramda';
// @ts-nocheck
import React, { useEffect } from 'react';
import intl from 'react-intl-universal';

import { AppToaster } from '@bigcapital/webapp/components';
import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import { PreferencesReceiptsForm } from './PreferencesReceiptsForm';
import { PreferencesReceiptsFormSchema } from './PreferencesReceiptsForm.schema';

import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import { useSaveSettings } from '@bigcapital/webapp/hooks/query';
import { compose, transformToForm, transfromToSnakeCase } from '@bigcapital/webapp/utils';
import { transferObjectOptionsToArray } from '../Accountant/utils';

const defaultValues = {
  termsConditions: '',
  receiptMessage: '',
};

/**
 * Preferences - Receipts.
 */
function PreferencesReceiptsFormPageRoot({
  // #withDashboardActions
  changePreferencesPageTitle,

  // #withSettings
  receiptSettings,
}) {
  // Save settings.
  const { mutateAsync: saveSettingMutate } = useSaveSettings();

  useEffect(() => {
    changePreferencesPageTitle(intl.get('preferences.receipts'));
  }, [changePreferencesPageTitle]);

  // Initial values.
  const initialValues = {
    ...defaultValues,
    ...transformToForm(receiptSettings, defaultValues),
  };
  // Handle the form submit.
  const handleFormSubmit = (values, { setSubmitting }) => {
    const options = R.compose(transferObjectOptionsToArray, transfromToSnakeCase)({ salesReceipts: { ...values } });

    // Handle request success.
    const onSuccess = () => {
      AppToaster.show({
        message: intl.get('preferences.receipts.success_message'),
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
      validationSchema={PreferencesReceiptsFormSchema}
      onSubmit={handleFormSubmit}
      component={PreferencesReceiptsForm}
    />
  );
}

export const PreferencesReceiptsFormPage = compose(
  withDashboardActions,
  withSettings(({ receiptSettings }) => ({
    receiptSettings: receiptSettings,
  })),
)(PreferencesReceiptsFormPageRoot);
