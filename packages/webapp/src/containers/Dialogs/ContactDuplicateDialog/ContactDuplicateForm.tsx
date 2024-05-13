import { FieldRequiredHint, ListSelect } from '@bigcapital/webapp/components';
import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { inputIntent } from '@bigcapital/webapp/utils';
import { Button, Classes, FormGroup, Intent } from '@blueprintjs/core';
import { ErrorMessage, Field, Form, Formik } from 'formik';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { useContactDuplicateFromContext } from './ContactDuplicateProvider';

import Contacts from '@bigcapital/webapp/constants/contactsOptions';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';

function ContactDuplicateForm({
  // #withDialogActions
  closeDialog,
}) {
  const history = useHistory();

  const { dialogName, contactId } = useContactDuplicateFromContext();

  const validationSchema = Yup.object().shape({
    contact_type: Yup.string().required().label(intl.get('contact_type_')),
  });

  const initialValues = {
    contact_type: '',
  };

  // Handle cancel button click.
  const handleCancelClick = () => {
    closeDialog(dialogName);
  };

  // Handle form submit.
  const handleFormSubmit = (values) => {
    closeDialog(dialogName);
    history.push(`${values.contact_type}/new?duplicate=${contactId}`, {
      action: contactId,
    });
  };

  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleFormSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <div className={Classes.DIALOG_BODY}>
            <p className="paragraph">
              <T id={'are_you_sure_want_to_duplicate'} />
            </p>

            {/*------------ Contact Type -----------*/}
            <Field name={'contact_type'}>
              {({ form, meta: { error, touched } }) => (
                <FormGroup
                  label={<T id={'contact_type'} />}
                  labelInfo={<FieldRequiredHint />}
                  intent={inputIntent({ error, touched })}
                  className={'form-group--select-list'}
                  helperText={<ErrorMessage name="contact_type" />}
                >
                  <ListSelect
                    items={Contacts}
                    onItemSelect={({ path }) => form.setFieldValue('contact_type', path)}
                    defaultText={<T id={'select_contact'} />}
                    textProp={'name'}
                    selectedItemProp={'name'}
                    filterable={false}
                    popoverProps={{ minimal: true }}
                  />
                </FormGroup>
              )}
            </Field>
          </div>

          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={handleCancelClick}>
                <T id={'cancel'} />
              </Button>

              <Button intent={Intent.PRIMARY} type="submit" disabled={isSubmitting}>
                <T id={'duplicate'} />
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default compose(withDialogActions)(ContactDuplicateForm);
