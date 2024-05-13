import { AppToaster } from '@bigcapital/webapp/components';
import { Intent } from '@blueprintjs/core';
import { Formik } from 'formik';
// @ts-nocheck
import React, { useCallback } from 'react';
import intl from 'react-intl-universal';

import AccountDialogFormContent from './AccountDialogFormContent';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose, transformToForm } from '@bigcapital/webapp/utils';
import { CreateAccountFormSchema, EditAccountFormSchema } from './AccountForm.schema';
import { transformAccountToForm, transformApiErrors, transformFormToReq } from './utils';

import '@bigcapital/webapp/style/pages/Accounts/AccountFormDialog.scss';
import { useAccountDialogContext } from './AccountDialogProvider';

// Default initial form values.
const defaultInitialValues = {
  account_type: '',
  parent_account_id: '',
  name: '',
  code: '',
  description: '',
  currency_code: '',
  subaccount: false,
};

/**
 * Account form dialog content.
 */
function AccountFormDialogContent({
  // #withDialogActions
  closeDialog,
}) {
  // Account form context.
  const {
    editAccountMutate,
    createAccountMutate,
    account,

    payload,
    isNewMode,
    dialogName,
  } = useAccountDialogContext();

  // Form validation schema in create and edit mode.
  const validationSchema = isNewMode ? CreateAccountFormSchema : EditAccountFormSchema;

  // Callbacks handles form submit.
  const handleFormSubmit = (values, { setSubmitting, setErrors }) => {
    const form = transformFormToReq(values);
    const toastAccountName = values.code ? `${values.code} - ${values.name}` : values.name;

    // Handle request success.
    const handleSuccess = () => {
      closeDialog(dialogName);

      AppToaster.show({
        message: intl.get(
          isNewMode ? 'service_has_been_created_successfully' : 'service_has_been_edited_successfully',
          {
            name: toastAccountName,
            service: intl.get('account'),
          },
        ),
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
    if (payload.accountId) {
      editAccountMutate([payload.accountId, form]).then(handleSuccess).catch(handleError);
    } else {
      createAccountMutate({ ...form })
        .then(handleSuccess)
        .catch(handleError);
    }
  };
  // Form initial values in create and edit mode.
  const initialValues = {
    ...defaultInitialValues,
    /**
     * We only care about the fields in the form. Previously unfilled optional
     * values such as `notes` come back from the API as null, so remove those
     * as well.
     */
    ...transformToForm(transformAccountToForm(account, payload), defaultInitialValues),
  };
  // Handles dialog close.
  const handleClose = useCallback(() => {
    closeDialog(dialogName);
  }, [closeDialog, dialogName]);

  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleFormSubmit}>
      <AccountDialogFormContent dialogName={dialogName} action={payload?.action} onClose={handleClose} />
    </Formik>
  );
}

export default compose(withDialogActions)(AccountFormDialogContent);
