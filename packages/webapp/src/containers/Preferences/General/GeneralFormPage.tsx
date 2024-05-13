import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
// @ts-nocheck
import React, { useEffect } from 'react';
import intl from 'react-intl-universal';

import '@bigcapital/webapp/style/pages/Preferences/GeneralForm.scss';

import { AppToaster } from '@bigcapital/webapp/components';
import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import { PreferencesGeneralSchema } from './General.schema';
import GeneralForm from './GeneralForm';
import { useGeneralFormContext } from './GeneralFormProvider';

import { compose, transformToForm } from '@bigcapital/webapp/utils';

const defaultValues = {
  name: '',
  industry: '',
  location: '',
  base_currency: '',
  language: '',
  fiscal_year: '',
  date_format: '',
  timezone: '',
  tax_number: '',
};

/**
 * Preferences - General form Page.
 */
function GeneralFormPage({
  // #withDashboardActions
  changePreferencesPageTitle,
}) {
  const { updateOrganization, organization } = useGeneralFormContext();

  useEffect(() => {
    changePreferencesPageTitle(intl.get('general'));
  }, [changePreferencesPageTitle]);

  // Initial values.
  const initialValues = {
    ...defaultValues,
    ...transformToForm(organization.metadata, defaultValues),
  };
  // Handle the form submit.
  const handleFormSubmit = (values, { setSubmitting, resetForm }) => {
    // Handle request success.
    const onSuccess = (response) => {
      AppToaster.show({
        message: intl.get('preferences.general.success_message'),
        intent: Intent.SUCCESS,
      });
      setSubmitting(false);

      // Reboot the application if the application's language is mutated.
      if (organization.metadata?.language !== values.language) {
        window.location.reload();
      }
    };
    // Handle request error.
    const onError = (errors) => {
      setSubmitting(false);
    };
    updateOrganization({ ...values })
      .then(onSuccess)
      .catch(onError);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PreferencesGeneralSchema}
      onSubmit={handleFormSubmit}
      component={GeneralForm}
    />
  );
}

export default compose(withDashboardActions)(GeneralFormPage);
