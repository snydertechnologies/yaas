import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import { defaultTo } from 'lodash';
import moment from 'moment';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { AppToaster } from '@bigcapital/webapp/components';
import { CreateVendorOpeningBalanceFormSchema } from './VendorOpeningBalanceForm.schema';
import { useVendorOpeningBalanceContext } from './VendorOpeningBalanceFormProvider';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import VendorOpeningBalanceFormContent from './VendorOpeningBalanceFormContent';

import { compose } from '@bigcapital/webapp/utils';

const defaultInitialValues = {
  opening_balance: '0',
  opening_balance_branch_id: '',
  opening_balance_exchange_rate: 1,
  opening_balance_at: moment(new Date()).format('YYYY-MM-DD'),
};

/**
 * Vendor Opening balance form.
 * @returns
 */
function VendorOpeningBalanceForm({
  // #withDialogActions
  closeDialog,
}) {
  const { dialogName, vendor, editVendorOpeningBalanceMutate } = useVendorOpeningBalanceContext();

  // Initial form values
  const initialValues = {
    ...defaultInitialValues,
    ...vendor,
    opening_balance: defaultTo(vendor.opening_balance, ''),
  };

  // Handles the form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    const formValues = {
      ...values,
    };

    // Handle request response success.
    const onSuccess = (response) => {
      AppToaster.show({
        message: intl.get('vendor_opening_balance.success_message'),
        intent: Intent.SUCCESS,
      });
      closeDialog(dialogName);
    };

    // Handle request response errors.
    const onError = ({
      response: {
        data: { errors },
      },
    }) => {
      if (errors) {
      }
      setSubmitting(false);
    };

    editVendorOpeningBalanceMutate([vendor.id, formValues]).then(onSuccess).catch(onError);
  };

  return (
    <Formik
      validationSchema={CreateVendorOpeningBalanceFormSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      component={VendorOpeningBalanceFormContent}
    />
  );
}
export default compose(withDialogActions)(VendorOpeningBalanceForm);
