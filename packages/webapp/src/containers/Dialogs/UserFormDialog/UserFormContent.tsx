import { Button, Classes, FormGroup, InputGroup, Intent } from '@blueprintjs/core';
import classNames from 'classnames';
import { ErrorMessage, FastField, Form, useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';

import { FFormGroup, FInputGroup, FormattedMessage as T } from '@bigcapital/webapp/components';
import { FieldRequiredHint, ListSelect } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { inputIntent } from '@bigcapital/webapp/utils';
import { compose } from '@bigcapital/webapp/utils';
import { useUserFormContext } from './UserFormProvider';
import { UserFormCalloutAlerts } from './components';

/**
 * User form content.
 */
function UserFormContent({
  calloutCode,

  // #withDialogActions
  closeDialog,
}) {
  const { isSubmitting } = useFormikContext();
  const { dialogName, roles, isAuth } = useUserFormContext();

  const handleClose = () => {
    closeDialog(dialogName);
  };

  return (
    <Form>
      <div className={Classes.DIALOG_BODY}>
        <UserFormCalloutAlerts calloutCodes={calloutCode} />

        {/* ----------- Email ----------- */}
        <FFormGroup name={'email'} label={<T id={'email'} />} labelInfo={<FieldRequiredHint />}>
          <FInputGroup name={'email'} />
        </FFormGroup>

        {/* ----------- First name ----------- */}
        <FFormGroup name={'first_name'} label={<T id={'first_name'} />} labelInfo={<FieldRequiredHint />}>
          <FInputGroup name={'first_name'} />
        </FFormGroup>

        {/* ----------- Last name ----------- */}
        <FFormGroup name={'last_name'} label={<T id={'last_name'} />} labelInfo={<FieldRequiredHint />}>
          <FInputGroup name={'last_name'} />
        </FFormGroup>

        {/* ----------- Role name ----------- */}
        <FastField name={'role_id'}>
          {({ form, field: { value }, meta: { error, touched } }) => (
            <FormGroup
              label={<T id={'roles.label.role_name'} />}
              labelInfo={<FieldRequiredHint />}
              helperText={<ErrorMessage name="role_id" />}
              className={classNames(CLASSES.FILL, 'form-group--role_name')}
              intent={inputIntent({ error, touched })}
            >
              <ListSelect
                items={roles}
                onItemSelect={({ id }) => {
                  form.setFieldValue('role_id', id);
                }}
                selectedItem={value}
                selectedItemProp={'id'}
                textProp={'name'}
                // labelProp={'id '}
                popoverProps={{ minimal: true }}
                intent={inputIntent({ error, touched })}
                disabled={isAuth}
              />
            </FormGroup>
          )}
        </FastField>
      </div>

      <div className={CLASSES.DIALOG_FOOTER}>
        <div className={CLASSES.DIALOG_FOOTER_ACTIONS}>
          <Button onClick={handleClose}>
            <T id={'cancel'} />
          </Button>

          <Button
            intent={Intent.PRIMARY}
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            style={{ minWidth: '85px' }}
          >
            <T id={'edit'} />
          </Button>
        </div>
      </div>
    </Form>
  );
}
export default compose(withDialogActions)(UserFormContent);
