import { Button, Classes, Intent } from '@blueprintjs/core';
import { Form, Formik } from 'formik';
// @ts-nocheck
import React, { useMemo } from 'react';
import * as Yup from 'yup';

import '@bigcapital/webapp/style/pages/ReferenceNumber/ReferenceNumber.scss';

import { FormObserver, FormattedMessage as T } from '@bigcapital/webapp/components';
import { saveInvoke, transformToForm } from '@bigcapital/webapp/utils';
import ReferenceNumberFormContent from './ReferenceNumberFormContent';
import { transformValuesToForm } from './utils';

const initialFormValues = {
  incrementMode: 'auto',
  numberPrefix: '',
  nextNumber: '',
  onceManualNumber: '',
};

// Validation schema.
const validationSchema = Yup.object().shape({
  incrementMode: Yup.string(),
  numberPrefix: Yup.string(),
  nextNumber: Yup.number(),
  onceManualNumber: Yup.string(),
});

/**
 * Reference number form.
 */
export default function ReferenceNumberForm({ initialValues, description, onSubmit, onClose, onChange }) {
  // Initial values.
  const formInitialValues = {
    ...initialFormValues,
    ...transformToForm(initialValues, initialFormValues),
  };
  // Handle the form submit.
  const handleSubmit = (values, methods) => {
    const parsed = transformValuesToForm(values);
    saveInvoke(onSubmit, { ...values, ...parsed }, methods);
  };

  return (
    <Formik initialValues={formInitialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ isSubmitting, values }) => (
        <Form className={'reference-number-form'}>
          <div className={Classes.DIALOG_BODY}>
            <p className="paragraph">{description}</p>
            <ReferenceNumberFormContent />
          </div>

          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={onClose}>
                <T id={'cancel'} />
              </Button>
              <Button intent={Intent.PRIMARY} type="submit" loading={isSubmitting}>
                <T id={'submit'} />
              </Button>
            </div>
          </div>

          <FormObserver values={values} onChange={onChange} />
        </Form>
      )}
    </Formik>
  );
}
