import { FFormGroup, FSelect } from '@bigcapital/webapp/components';
import { EntriesActionsBar } from '@bigcapital/webapp/containers/Entries/EntriesActionBar';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { InclusiveButtonOptions } from './constants';
import { composeEntriesOnEditInclusiveTax } from './utils';

/**
 * Invoice form actions.
 * @returns {React.ReactNode}
 */
export function InvoiceFormActions() {
  return (
    <EntriesActionsBar>
      <InvoiceExclusiveInclusiveSelect />
    </EntriesActionsBar>
  );
}

/**
 * Invoice exclusive/inclusive select.
 * @returns {React.ReactNode}
 */
export function InvoiceExclusiveInclusiveSelect(props) {
  const { values, setFieldValue } = useFormikContext();

  const handleItemSelect = (item) => {
    const newEntries = composeEntriesOnEditInclusiveTax(item.key, values.entries);
    setFieldValue('inclusive_exclusive_tax', item.key);
    setFieldValue('entries', newEntries);
  };

  return (
    <InclusiveFormGroup name={'inclusive_exclusive_tax'} label={'Amounts are'} inline={true}>
      <FSelect
        name={'inclusive_exclusive_tax'}
        items={InclusiveButtonOptions}
        textAccessor={'label'}
        labelAccessor={() => ''}
        valueAccessor={'key'}
        popoverProps={{ minimal: true, usePortal: true, inline: false }}
        buttonProps={{ small: true }}
        onItemSelect={handleItemSelect}
        filterable={false}
        {...props}
      />
    </InclusiveFormGroup>
  );
}

const InclusiveFormGroup = styled(FFormGroup)`
  margin-left: auto;
`;
