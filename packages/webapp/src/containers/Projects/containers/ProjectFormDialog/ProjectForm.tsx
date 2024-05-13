import { AppToaster } from '@bigcapital/webapp/components';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
import moment from 'moment';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import { CreateProjectFormSchema } from './ProjectForm.schema';
import ProjectFormContent from './ProjectFormContent';
import { useProjectFormContext } from './ProjectFormProvider';

import { compose, transformToForm } from '@bigcapital/webapp/utils';

const defaultInitialValues = {
  contact_id: '',
  name: '',
  deadline: moment(new Date()).format('YYYY-MM-DD'),
  published: false,
  cost_estimate: '',
};

/**
 * Project form
 * @returns
 */
function ProjectForm({
  // #withDialogActions
  closeDialog,
}) {
  // project form dialog context.
  const { dialogName, project, isNewMode, projectId, createProjectMutate, editProjectMutate } = useProjectFormContext();

  // Initial form values
  const initialValues = {
    ...defaultInitialValues,
    ...transformToForm(project, defaultInitialValues),
  };

  // Handles the form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    setSubmitting(true);
    const form = { ...values };

    // Handle request response success.
    const onSuccess = (response) => {
      AppToaster.show({
        message: intl.get(isNewMode ? 'projects.dialog.success_message' : 'projects.dialog.edit_success_message'),

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
      setSubmitting(false);
    };

    if (isNewMode) {
      createProjectMutate(form).then(onSuccess).catch(onError);
    } else {
      editProjectMutate([projectId, form]).then(onSuccess).catch(onError);
    }
  };

  return (
    <Formik
      validationSchema={CreateProjectFormSchema}
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      component={ProjectFormContent}
    />
  );
}

export default compose(withDialogActions)(ProjectForm);
