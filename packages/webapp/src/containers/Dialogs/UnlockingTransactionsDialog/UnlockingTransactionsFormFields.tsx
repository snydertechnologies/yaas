import { FieldRequiredHint, FormattedMessage as T } from '@bigcapital/webapp/components';
import { useAutofocus } from '@bigcapital/webapp/hooks';
import { inputIntent } from '@bigcapital/webapp/utils';
import { Classes, FormGroup, TextArea } from '@blueprintjs/core';
import { ErrorMessage, FastField } from 'formik';
// @ts-nocheck
import React from 'react';

/**
 * Unlocking transactions form fields.
 */
export default function UnlockingTransactionsFormFields() {
  const reasonFieldRef = useAutofocus();

  return (
    <div className={Classes.DIALOG_BODY}>
      {/*------------ Locking  Reason -----------*/}
      <FastField name={'reason'}>
        {({ field, meta: { error, touched } }) => (
          <FormGroup
            label={<T id={'unlocking_transactions.dialog.reason'} />}
            labelInfo={<FieldRequiredHint />}
            className={'form-group--reason'}
            intent={inputIntent({ error, touched })}
            helperText={<ErrorMessage name={'reason'} />}
          >
            <TextArea
              growVertically={true}
              large={true}
              intent={inputIntent({ error, touched })}
              inputRef={(ref) => (reasonFieldRef.current = ref)}
              {...field}
            />
          </FormGroup>
        )}
      </FastField>
    </div>
  );
}
