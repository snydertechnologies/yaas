import { Intent } from '@blueprintjs/core';
import { flatten, unflatten } from 'flat';
import { Formik } from 'formik';
import * as R from 'ramda';
// @ts-nocheck
import React, { useEffect } from 'react';
import intl from 'react-intl-universal';

import { AppToaster } from '@bigcapital/webapp/components';
import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';

import { compose, transformToForm, transfromToSnakeCase } from '@bigcapital/webapp/utils';
import { AccountantSchema } from './Accountant.schema';
import AccountantForm from './AccountantForm';
import { useAccountantFormContext } from './AccountantFormProvider';
import { transferObjectOptionsToArray } from './utils';

import '@bigcapital/webapp/style/pages/Preferences/Accounting.scss';

const defaultFormValues = flatten({
  organization: {
    accountingBasis: 'accrual',
  },
  accounts: {
    accountCodeRequired: false,
    accountCodeUnique: false,
  },
  billPayments: {
    withdrawalAccount: '',
  },
  paymentReceives: {
    preferredDepositAccount: '',
    preferredAdvanceDeposit: '',
  },
});

// Accountant preferences.
function AccountantFormPage({
  //# withDashboardActions
  changePreferencesPageTitle,

  // #withSettings
  allSettings,
}) {
  const { saveSettingMutate } = useAccountantFormContext();

  useEffect(() => {
    changePreferencesPageTitle(intl.get('accountant'));
  }, [changePreferencesPageTitle]);

  const initialValues = unflatten({
    ...defaultFormValues,
    ...transformToForm(flatten(allSettings), defaultFormValues),
  });
  // Handle the form submitting.
  const handleFormSubmit = (values, { setSubmitting }) => {
    const options = R.compose(transferObjectOptionsToArray, transfromToSnakeCase)(values);
    setSubmitting(true);

    const onSuccess = () => {
      AppToaster.show({
        message: intl.get('the_accountant_preferences_has_been_saved'),
        intent: Intent.SUCCESS,
      });
      setSubmitting(false);
    };
    const onError = () => {
      setSubmitting(false);
    };
    saveSettingMutate({ options }).then(onSuccess).catch(onError);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AccountantSchema}
      onSubmit={handleFormSubmit}
      component={AccountantForm}
    />
  );
}

export default compose(
  withSettings(({ allSettings }) => ({
    allSettings,
  })),
  withDashboardActions,
)(AccountantFormPage);
