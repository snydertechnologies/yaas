import { AppToaster } from '@bigcapital/webapp/components';
import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import moment from 'moment';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import { CreateProjectInvoicingFormSchema } from './ProjectInvoicingForm.schema';
import ProjectInvoicingFormContent from './ProjectInvoicingFormContent';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';

import { compose } from '@bigcapital/webapp/utils';

const defaultInitialValues = {
  date: moment(new Date()).format('YYYY-MM-DD'),
  time: false,
  unbilled: false,
  bills: false,
};

/**
 * project invoicing form.
 * @returns
 */
function ProjectInvoicingForm({
  // #withDialogActions
  closeDialog,
}) {
  // Initial form values
  const initialValues = {
    ...defaultInitialValues,
  };

  // Handles the form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    // Handle request response success.
    const onSuccess = (response) => {};

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
      validationSchema={CreateProjectInvoicingFormSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      component={ProjectInvoicingFormContent}
    />
  );
}

export default compose(withDialogActions)(ProjectInvoicingForm);
