// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';

import { AppToaster } from '@bigcapital/webapp/components';
import { CreateWarehouseFormSchema } from './WarehouseForm.schema';
import WarehouseFormContent from './WarehouseFormContent';
import { useWarehouseFormContext } from './WarehouseFormProvider';
import { transformErrors } from './utils';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose, transformToForm } from '@bigcapital/webapp/utils';

const defaultInitialValues = {
  name: '',
  code: '',
  address: '',
  city: '',
  country: '',
  phone_number: '',
  website: '',
  email: '',
};

/**
 * Warehouse form.
 * @returns
 */
function WarehouseForm({
  // #withDialogActions
  closeDialog,
}) {
  const { dialogName, warehouse, warehouseId, createWarehouseMutate, editWarehouseMutate } = useWarehouseFormContext();

  // Initial form values.
  const initialValues = {
    ...defaultInitialValues,
    ...transformToForm(warehouse, defaultInitialValues),
  };

  // Handles the form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    const form = { ...values };

    // Handle request response success.
    const onSuccess = (response) => {
      AppToaster.show({
        message: intl.get('warehouse.dialog.success_message'),
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
      transformErrors(errors, { setErrors });

      setSubmitting(false);
    };

    if (warehouseId) {
      editWarehouseMutate([warehouseId, form]).then(onSuccess).catch(onError);
    } else {
      createWarehouseMutate(form).then(onSuccess).catch(onError);
    }
  };

  return (
    <Formik
      validationSchema={CreateWarehouseFormSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      component={WarehouseFormContent}
    />
  );
}

export default compose(withDialogActions)(WarehouseForm);
