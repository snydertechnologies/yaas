import { CLASSES } from '@bigcapital/webapp/constants/classes';
import classNames from 'classnames';
import { FastField } from 'formik';
// @ts-nocheck
import React from 'react';
import PaymentMadeEntriesTable from './PaymentMadeEntriesTable';

export default function PaymentMadeFormBody() {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_BODY)}>
      <FastField name={'entries'}>
        {({ form: { setFieldValue, values }, field: { value }, meta: { error, touched } }) => (
          <PaymentMadeEntriesTable
            entries={value}
            onUpdateData={(newEntries) => {
              setFieldValue('entries', newEntries);
            }}
            currencyCode={values.currency_code}
          />
        )}
      </FastField>
    </div>
  );
}
