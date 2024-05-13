import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import * as R from 'ramda';
// @ts-nocheck
import React, { useEffect } from 'react';
import intl from 'react-intl-universal';

import { AppToaster } from '@bigcapital/webapp/components';
import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import { PreferencesEstimatesForm } from './PreferencesEstimatesForm';
import { PreferencesEstimatesFormSchema } from './PreferencesEstimatesForm.schema';

import { useSaveSettings } from '@bigcapital/webapp/hooks/query';
import { compose, transformToForm, transfromToSnakeCase } from '@bigcapital/webapp/utils';
import { transferObjectOptionsToArray } from '../Accountant/utils';

const defaultValues = {
  termsConditions: '',
  customerNotes: '',
};

/**
 * Preferences estimates form.
 */
function PreferencesEstimatesFormPageRoot({
  // #withDashboardActions
  changePreferencesPageTitle,

  // #withSettings
  estimatesSettings,
}) {
  // Save Organization Settings.
  const { mutateAsync: saveSettingMutate } = useSaveSettings();

  useEffect(() => {
    changePreferencesPageTitle(intl.get('preferences.estimates'));
  }, [changePreferencesPageTitle]);

  // Initial values.
  const initialValues = {
    ...defaultValues,
    ...transformToForm(estimatesSettings, defaultValues),
  };
  // Handle the form submit.
  const handleFormSubmit = (values, { setSubmitting }) => {
    const options = R.compose(transferObjectOptionsToArray, transfromToSnakeCase)({ salesEstimates: { ...values } });

    // Handle request success.
    const onSuccess = (response) => {
      AppToaster.show({
        message: intl.get('preferences.estimates.success_message'),
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
      validationSchema={PreferencesEstimatesFormSchema}
      onSubmit={handleFormSubmit}
      component={PreferencesEstimatesForm}
    />
  );
}

export const PreferencesEstimatesFormPage = compose(
  withDashboardActions,
  withSettings(({ estimatesSettings }) => ({
    estimatesSettings: estimatesSettings,
  })),
)(PreferencesEstimatesFormPageRoot);
