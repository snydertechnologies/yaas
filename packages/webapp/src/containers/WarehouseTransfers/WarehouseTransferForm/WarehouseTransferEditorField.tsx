import { CLASSES } from '@bigcapital/webapp/constants/classes';
import classNames from 'classnames';
import { FastField } from 'formik';
// @ts-nocheck
import React from 'react';
import WarehouseTransferFormEntriesTable from './WarehouseTransferFormEntriesTable';
import { useWarehouseTransferFormContext } from './WarehouseTransferFormProvider';
import { defaultWarehouseTransferEntry, entriesFieldShouldUpdate, useWatchItemsCostSetCostEntries } from './utils';

/**
 * Warehouse transafer editor field.
 */
export default function WarehouseTransferEditorField() {
  const { items } = useWarehouseTransferFormContext();

  // Watches inventory items cost and sets cost to form entries.
  useWatchItemsCostSetCostEntries();

  return (
    <div className={classNames(CLASSES.PAGE_FORM_BODY)}>
      <FastField name={'entries'} items={items} shouldUpdate={entriesFieldShouldUpdate}>
        {({ form: { values, setFieldValue }, field: { value }, meta: { error, touched } }) => (
          <WarehouseTransferFormEntriesTable
            entries={value}
            onUpdateData={(entries) => {
              setFieldValue('entries', entries);
            }}
            items={items}
            defaultEntry={defaultWarehouseTransferEntry}
            errors={error}
            sourceWarehouseId={values.from_warehouse_id}
            destinationWarehouseId={values.to_warehouse_id}
          />
        )}
      </FastField>
    </div>
  );
}
