import { FFormGroup, FSelect } from '@bigcapital/webapp/components';
import { InclusiveTaxOptions } from '@bigcapital/webapp/constants/InclusiveTaxOptions';
import { useFormikContext } from 'formik';
// @ts-nocheck
import styled from 'styled-components';

import { EntriesActionsBar } from '@bigcapital/webapp/containers/Entries/EntriesActionBar';
import { composeEntriesOnEditInclusiveTax } from './utils';

export function BillFormEntriesActions() {
  return (
    <EntriesActionsBar>
      <BillExclusiveInclusiveSelect />
    </EntriesActionsBar>
  );
}

/**
 * Bill exclusive/inclusive select.
 * @returns {React.ReactNode}
 */
export function BillExclusiveInclusiveSelect(props) {
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
        items={InclusiveTaxOptions}
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
