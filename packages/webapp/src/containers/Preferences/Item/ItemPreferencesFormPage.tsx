import { AppToaster } from '@bigcapital/webapp/components';
import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import { omit } from 'lodash';
// @ts-nocheck
import React, { useEffect } from 'react';
import intl from 'react-intl-universal';
import { ItemPreferencesSchema } from './ItemPreferences.schema';
import ItemPreferencesForm from './ItemPreferencesForm';

import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import { compose, optionsMapToArray, transformGeneralSettings, transformToForm } from '@bigcapital/webapp/utils';
import { useItemPreferencesFormContext } from './ItemPreferencesFormProvider';

import '@bigcapital/webapp/style/pages/Preferences/Accounting.scss';

const defaultFormValues = {
  preferred_sell_account: '',
  preferred_cost_account: '',
  preferred_inventory_account: '',
};

// item form page preferences.
function ItemPreferencesFormPage({
  // #withSettings
  itemsSettings,

  // #withDashboardActions
  changePreferencesPageTitle,
}) {
  const { saveSettingMutate } = useItemPreferencesFormContext();

  // Initial values.
  const initialValues = {
    ...defaultFormValues,
    ...transformToForm(transformGeneralSettings(itemsSettings), defaultFormValues),
  };

  useEffect(() => {
    changePreferencesPageTitle(intl.get('items'));
  }, [changePreferencesPageTitle]);

  // Handle form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    const options = optionsMapToArray(values).map((option) => ({
      ...option,
      group: 'items',
    }));

    const onSuccess = () => {
      AppToaster.show({
        message: intl.get('the_items_preferences_has_been_saved'),
        intent: Intent.SUCCESS,
      });
      setSubmitting(false);
    };

    const onError = (errors) => {
      setSubmitting(false);
    };
    saveSettingMutate({ options }).then(onSuccess).catch(onError);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ItemPreferencesSchema}
      onSubmit={handleFormSubmit}
      component={ItemPreferencesForm}
    />
  );
}

export default compose(
  withSettings(({ itemsSettings }) => ({ itemsSettings })),
  withDashboardActions,
)(ItemPreferencesFormPage);
