import {
  FFormGroup,
  FInputGroup,
  FieldRequiredHint,
  ListSelect,
  FormattedMessage as T,
} from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { compose, inputIntent } from '@bigcapital/webapp/utils';
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core';
import classNames from 'classnames';
import { ErrorMessage, FastField, Form, useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import { useInviteUserFormContext } from './InviteUserFormProvider';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';

function InviteUserFormContent({
  // #withDialogActions
  closeDialog,
}) {
  const { isSubmitting } = useFormikContext();
  const { isEditMode, dialogName, roles } = useInviteUserFormContext();

  const handleClose = () => {
    closeDialog(dialogName);
  };

  return (
    <Form>
      <div className={CLASSES.DIALOG_BODY}>
        <p className="mb2">
          <T id={'your_access_to_your_team'} />
        </p>
        {/* ----------- Email ----------- */}
        <FFormGroup name={'email'} label={<T id={'invite_user.label.email'} />} labelInfo={<FieldRequiredHint />}>
          <FInputGroup name={'email'} />
        </FFormGroup>
        {/* ----------- Role name ----------- */}
        <FastField name={'role_id'}>
          {({ form, field: { value }, meta: { error, touched } }) => (
            <FormGroup
              label={<T id={'invite_user.label.role_name'} />}
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
            style={{ minWidth: '95px' }}
          >
            {isEditMode ? <T id={'edit'} /> : <T id={'invite'} />}
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default compose(withDialogActions)(InviteUserFormContent);
