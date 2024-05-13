import { CLASSES } from '@bigcapital/webapp/constants/classes';
import ItemsEntriesTable from '@bigcapital/webapp/containers/Entries/ItemsEntriesTable';
import classNames from 'classnames';
import { FastField } from 'formik';
// @ts-nocheck
import React from 'react';
import { useReceiptFormContext } from './ReceiptFormProvider';
import { entriesFieldShouldUpdate } from './utils';

export default function ReceiptItemsEntriesEditor({ defaultReceipt }) {
  const { items } = useReceiptFormContext();

  return (
    <div className={classNames(CLASSES.PAGE_FORM_BODY)}>
      <FastField name={'entries'} items={items} shouldUpdate={entriesFieldShouldUpdate}>
        {({ form: { values, setFieldValue }, field: { value }, meta: { error, touched } }) => (
          <ItemsEntriesTable
            value={value}
            onChange={(entries) => {
              setFieldValue('entries', entries);
            }}
            items={items}
            errors={error}
            linesNumber={4}
            currencyCode={values.currency_code}
            enableTaxRates={false}
          />
        )}
      </FastField>
    </div>
  );
}
