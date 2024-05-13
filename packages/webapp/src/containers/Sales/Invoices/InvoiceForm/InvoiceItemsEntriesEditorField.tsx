import ItemsEntriesTable from '@bigcapital/webapp/containers/Entries/ItemsEntriesTable';
import { ITEM_TYPE } from '@bigcapital/webapp/containers/Entries/utils';
import { TaxType } from '@bigcapital/webapp/interfaces/TaxRates';
import { FastField } from 'formik';
// @ts-nocheck
import React from 'react';
import { useInvoiceFormContext } from './InvoiceFormProvider';
import { entriesFieldShouldUpdate } from './utils';

/**
 * Invoice items entries editor field.
 */
export default function InvoiceItemsEntriesEditorField() {
  const { items, taxRates } = useInvoiceFormContext();

  return (
    <FastField name={'entries'} items={items} taxRates={taxRates} shouldUpdate={entriesFieldShouldUpdate}>
      {({ form: { values, setFieldValue }, field: { value }, meta: { error, touched } }) => (
        <ItemsEntriesTable
          value={value}
          onChange={(entries) => {
            setFieldValue('entries', entries);
          }}
          items={items}
          taxRates={taxRates}
          itemType={ITEM_TYPE.SELLABLE}
          errors={error}
          linesNumber={4}
          currencyCode={values.currency_code}
          isInclusiveTax={values.inclusive_exclusive_tax === TaxType.Inclusive}
        />
      )}
    </FastField>
  );
}
