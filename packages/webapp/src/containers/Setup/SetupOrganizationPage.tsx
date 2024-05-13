import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Formik } from 'formik';
// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/pages/Setup/Organization.scss';

import SetupOrganizationForm from './SetupOrganizationForm';

import withSettingsActions from '@bigcapital/webapp/containers/Settings/withSettingsActions';
import { useOrganizationSetup } from '@bigcapital/webapp/hooks/query';

import { compose, setCookie, transfromToSnakeCase } from '@bigcapital/webapp/utils';
import { getSetupOrganizationValidation } from './SetupOrganization.schema';

// Initial values.
const defaultValues = {
  name: '',
  location: '',
  baseCurrency: '',
  language: 'en',
  fiscalYear: '',
  timezone: '',
};

/**
 * Setup organization form.
 */
function SetupOrganizationPage({ wizard }) {
  const { mutateAsync: organizationSetupMutate } = useOrganizationSetup();

  // Validation schema.
  const validationSchema = getSetupOrganizationValidation();

  // Initialize values.
  const initialValues = {
    ...defaultValues,
  };

  // Handle the form submit.
  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    organizationSetupMutate({ ...transfromToSnakeCase(values) })
      .then((response) => {
        setSubmitting(false);

        // Sets locale cookie to next boot cycle.
        setCookie('locale', values.language);
        wizard.next();
      })
      .catch((erros) => {
        setSubmitting(false);
      });
  };

  return (
    <div className={'setup-organization'}>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        component={SetupOrganizationForm}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default compose(withSettingsActions)(SetupOrganizationPage);
