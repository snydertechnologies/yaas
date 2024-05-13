import { Choose, If } from '@bigcapital/webapp/components';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import DecrementAdjustmentFields from './DecrementAdjustmentFields';
import IncrementAdjustmentFields from './IncrementAdjustmentFields';

export default function InventoryAdjustmentQuantityFields() {
  const { values } = useFormikContext();

  return (
    <div className="adjustment-fields">
      <Choose>
        <Choose.When condition={values.type === 'decrement'}>
          <DecrementAdjustmentFields />
        </Choose.When>
        <Choose.When condition={values.type === 'increment'}>
          <IncrementAdjustmentFields />
        </Choose.When>
      </Choose>
    </div>
  );
}
