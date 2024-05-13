import { CLASSES } from '@bigcapital/webapp/constants/classes';
import classNames from 'classnames';
import { FastField } from 'formik';
// @ts-nocheck
import React from 'react';
import AllocateLandedCostEntriesTable from './AllocateLandedCostEntriesTable';

export default function AllocateLandedCostFormBody() {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_BODY)}>
      <FastField name={'items'}>
        {({ form: { setFieldValue, values }, field: { value }, meta: { error, touched } }) => (
          <AllocateLandedCostEntriesTable
            entries={value}
            onUpdateData={(newEntries) => {
              setFieldValue('items', newEntries);
            }}
          />
        )}
      </FastField>
    </div>
  );
}
