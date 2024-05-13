import { CLASSES } from '@bigcapital/webapp/constants/classes';
import classNames from 'classnames';
import { FastField } from 'formik';
// @ts-nocheck
import React from 'react';
import PaymentReceiveItemsTable from './PaymentReceiveItemsTable';

/**
 * Payment Receive form body.
 */
export default function PaymentReceiveFormBody() {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_BODY)}>
      <FastField name={'entries'}>
        {({ form: { values, setFieldValue }, field: { value } }) => (
          <PaymentReceiveItemsTable
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
