// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';

import { AppToaster } from '@bigcapital/webapp/components';
import WarehouseActivateFormContent from './WarehouseActivateFormContent';
import { useWarehouseActivateContext } from './WarehouseActivateFormProvider';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';

import { compose } from '@bigcapital/webapp/utils';

/**
 * warehouse activate form.
 */
function WarehouseActivateForm({
  // #withDialogActions
  closeDialog,
}) {
  const { activateWarehouses, dialogName } = useWarehouseActivateContext();

  // Initial form values
  const initialValues = {};

  // Handles the form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    const form = {
      ...values,
    };
    setSubmitting(true);
    // Handle request response success.
    const onSuccess = (response) => {
      AppToaster.show({
        message: intl.get('warehouse_activate.dialog_success_message'),
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
    activateWarehouses(form).then(onSuccess).catch(onError);
  };

  return <Formik initialValues={initialValues} onSubmit={handleFormSubmit} component={WarehouseActivateFormContent} />;
}
export default compose(withDialogActions)(WarehouseActivateForm);
