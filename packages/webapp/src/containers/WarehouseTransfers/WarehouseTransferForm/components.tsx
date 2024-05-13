import { FormikObserver } from '@bigcapital/webapp/components';
import { chain } from 'lodash';
// @ts-nocheck
import React from 'react';
import { useWarehouseTransferFormContext } from './WarehouseTransferFormProvider';

export function WarehouseTransferObserveItemsCost() {
  const { setItemCostQuery } = useWarehouseTransferFormContext();

  // Handle the form change.
  const handleFormChange = (values) => {
    const { date } = values;
    const itemsIds = chain(values.entries)
      .filter((e) => e.item_id)
      .map((e) => e.item_id)
      .uniq()
      .value();

    setItemCostQuery({ date, itemsIds });
  };
  return <FormikObserver onChange={handleFormChange} />;
}
