import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import * as R from 'ramda';
// @ts-nocheck
import { useEffect } from 'react';
import intl from 'react-intl-universal';

import { AppToaster } from '@bigcapital/webapp/components';
import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import { PreferencesCreditNotesForm } from './PreferencesCreditNotesForm';
import { PreferencesCreditNotesFormSchema } from './PreferencesCreditNotesForm.schema';

import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import { useSaveSettings } from '@bigcapital/webapp/hooks/query';
import { compose, transformToForm, transfromToSnakeCase } from '@bigcapital/webapp/utils';
import { transferObjectOptionsToArray } from '../Accountant/utils';

const defaultValues = {
  termsConditions: '',
  customerNotes: '',
};

/**
 * Preferences - Credit Notes.
 */
function PreferencesCreditNotesFormPageRoot({
  // #withDashboardActions
  changePreferencesPageTitle,

  // #withSettings
  creditNoteSettings,
}) {
  // Save settings.
  const { mutateAsync: saveSettingMutate } = useSaveSettings();

  useEffect(() => {
    changePreferencesPageTitle(intl.get('preferences.creditNotes'));
  }, [changePreferencesPageTitle]);

  // Initial values.
  const initialValues = {
    ...defaultValues,
    ...transformToForm(creditNoteSettings, defaultValues),
  };
  // Handle the form submit.
  const handleFormSubmit = (values, { setSubmitting }) => {
    const options = R.compose(transferObjectOptionsToArray, transfromToSnakeCase)({ creditNote: { ...values } });

    // Handle request success.
    const onSuccess = () => {
      AppToaster.show({
        message: intl.get('preferences.credit_notes.success_message'),
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
      validationSchema={PreferencesCreditNotesFormSchema}
      onSubmit={handleFormSubmit}
      component={PreferencesCreditNotesForm}
    />
  );
}

export const PreferencesCreditNotesFormPage = compose(
  withDashboardActions,
  withSettings(({ creditNoteSettings }) => ({
    creditNoteSettings: creditNoteSettings,
  })),
)(PreferencesCreditNotesFormPageRoot);
