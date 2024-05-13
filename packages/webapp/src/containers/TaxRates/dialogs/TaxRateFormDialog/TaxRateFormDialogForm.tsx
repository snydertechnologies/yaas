import { AppToaster } from '@bigcapital/webapp/components';
import { Classes, Intent } from '@blueprintjs/core';
import { Form, Formik } from 'formik';
// @ts-nocheck
import React from 'react';

import TaxRateFormDialogFormContent from './TaxRateFormDialogFormContent';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
import { useCreateTaxRate, useEditTaxRate } from '@bigcapital/webapp/hooks/query/taxRates';
import { compose } from '@bigcapital/webapp/utils';
import { CreateTaxRateFormSchema, EditTaxRateFormSchema } from './TaxRateForm.schema';
import { useTaxRateFormDialogContext } from './TaxRateFormDialogBoot';
import { TaxRateFormDialogFormErrors } from './TaxRateFormDialogFormErrors';
import { TaxRateFormDialogFormFooter } from './TaxRateFormDialogFormFooter';
import { isTaxRateChange, transformApiErrors, transformFormToReq, transformTaxRateToForm } from './utils';

/**
 * Tax rate form dialog content.
 */
function TaxRateFormDialogForm({
  // #withDialogActions
  closeDialog,

  // #withDrawerActions
  closeDrawer,
}) {
  // Account form context.
  const { taxRate, taxRateId, isNewMode, dialogName } = useTaxRateFormDialogContext();

  // Form validation schema in create and edit mode.
  const validationSchema = isNewMode ? CreateTaxRateFormSchema : EditTaxRateFormSchema;

  const { mutateAsync: createTaxRateMutate } = useCreateTaxRate();
  const { mutateAsync: editTaxRateMutate } = useEditTaxRate();

  // Form initial values in create and edit mode.
  const initialValues = transformTaxRateToForm(taxRate);

  // Callbacks handles form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    const isTaxChanged = isTaxRateChange(initialValues, values);

    // Detarmines whether in edit mode and tax rate has been changed
    // and confirm box is not checked.
    if (!isNewMode && isTaxChanged && !values.confirm_edit) {
      setErrors({
        confirm_edit: 'Please review the terms and conditions below before proceeding',
      });
      setSubmitting(false);
      return;
    }
    const form = transformFormToReq(values);

    // Handle request success on edit.
    const handleSuccessOnEdit = (response) => {
      if (response?.data?.data?.id !== taxRateId) {
        closeDrawer(DRAWERS.TAX_RATE_DETAILS);
      }
    };
    // Handle request success.
    const handleSuccess = () => {
      closeDialog(dialogName);
      AppToaster.show({
        message: 'The tax rate has been created successfully.',
        intent: Intent.SUCCESS,
      });
    };
    // Handle request error.
    const handleError = (error) => {
      const {
        response: {
          data: { errors },
        },
      } = error;

      const errorsTransformed = transformApiErrors(errors);
      setErrors({ ...errorsTransformed });
      setSubmitting(false);
    };
    if (isNewMode) {
      createTaxRateMutate({ ...form })
        .then(handleSuccess)
        .catch(handleError);
    } else {
      editTaxRateMutate([taxRateId, { ...form }])
        .then(handleSuccessOnEdit)
        .then(handleSuccess)
        .catch(handleError);
    }
  };

  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleFormSubmit}>
      <Form>
        <div className={Classes.DIALOG_BODY}>
          <TaxRateFormDialogFormErrors />
          <TaxRateFormDialogFormContent />
        </div>
        <TaxRateFormDialogFormFooter />
      </Form>
    </Formik>
  );
}

export default compose(withDialogActions, withDrawerActions)(TaxRateFormDialogForm);
