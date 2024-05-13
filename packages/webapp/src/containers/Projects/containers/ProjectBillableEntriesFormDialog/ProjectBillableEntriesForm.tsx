// @ts-nocheck

import { AppToaster } from '@bigcapital/webapp/components';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { Formik } from 'formik';
import React from 'react';
import intl from 'react-intl-universal';
import { ProjectBillableEntriesFormSchema } from './ProjectBillableEntriesForm.schema';
import ProjectBillableEntriesFormContent from './ProjectBillableEntriesFormContent';

import { compose } from '@bigcapital/webapp/utils';

const defaultInitialValues = {};

/**
 * project billable entries form.
 * @returns
 */
function ProjectBillableEntriesForm({
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
      validationSchema={ProjectBillableEntriesFormSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      component={ProjectBillableEntriesFormContent}
    />
  );
}

export default compose(withDialogActions)(ProjectBillableEntriesForm);
