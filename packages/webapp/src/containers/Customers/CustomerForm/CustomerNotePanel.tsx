import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { inputIntent } from '@bigcapital/webapp/utils';
import { Classes, FormGroup, TextArea } from '@blueprintjs/core';
import classNames from 'classnames';
import { ErrorMessage, FastField } from 'formik';
// @ts-nocheck
import React from 'react';

export default function CustomerNotePanel({ errors, touched, getFieldProps }) {
  return (
    <div className={'tab-panel--note'}>
      <FastField name={'note'}>
        {({ field, field: { value }, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'note'} />}
            className={classNames('form-group--note', Classes.FILL)}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name="payment_date" />}
          >
            <TextArea {...field} />
          </FormGroup>
        )}
      </FastField>
    </div>
  );
}
