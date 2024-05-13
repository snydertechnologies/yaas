import { AppToaster } from '@bigcapital/webapp/components';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { Formik } from 'formik';
import moment from 'moment';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import { CreateProjectExpenseFormSchema } from './ProjectExpenseForm.schema';
import ProjectExpenseFormContent from './ProjectExpenseFormContent';
import { useProjectExpenseFormContext } from './ProjectExpenseFormProvider';

import { compose } from '@bigcapital/webapp/utils';

const defaultInitialValues = {
  expenseName: '',
  estimatedExpense: '',
  expemseDate: moment(new Date()).format('YYYY-MM-DD'),
  expenseUnitPrice: '',
  expenseQuantity: 1,
  expenseCharge: '% markup',
  percentage: '',
  expenseTotal: '',
};

/**
 * Project expense form.
 * @returns
 */
function ProjectExpenseForm({
  //#withDialogActions
  closeDialog,
}) {
  const initialValues = {
    ...defaultInitialValues,
  };

  // Handles the form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    const form = {};

    // Handle request response success.
    const onSuccess = (response) => {
      AppToaster.show({});
    };

    // Handle request response errors.
    const onError = ({
      response: {
        data: { errors },
      },
    }) => {
      setSubmitting(false);
    };
  };
  return (
    <Formik
      validationSchema={CreateProjectExpenseFormSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      component={ProjectExpenseFormContent}
    />
  );
}

export default compose(withDialogActions)(ProjectExpenseForm);
