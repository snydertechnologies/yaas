import { CloudLoadingIndicator, DataTableEditable, FormattedMessage as T } from '@bigcapital/webapp/components';
import classNames from 'classnames';
// @ts-nocheck
import React, { useCallback } from 'react';

import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { compose, updateTableCell } from '@bigcapital/webapp/utils';
import { useFormikContext } from 'formik';
import { usePaymentMadeInnerContext } from './PaymentMadeInnerProvider';
import { usePaymentMadeEntriesTableColumns } from './components';

/**
 * Payment made items table.
 */
export default function PaymentMadeEntriesTable({ onUpdateData, entries, currencyCode }) {
  // Payment made inner context.
  const { isNewEntriesFetching } = usePaymentMadeInnerContext();

  // Payment entries table columns.
  const columns = usePaymentMadeEntriesTableColumns();

  // Formik context.
  const {
    values: { vendor_id },
    errors,
  } = useFormikContext();

  // Handle update data.
  const handleUpdateData = useCallback(
    (rowIndex, columnId, value) => {
      const newRows = compose(updateTableCell(rowIndex, columnId, value))(entries);
      onUpdateData(newRows);
    },
    [onUpdateData, entries],
  );
  // Detarmines the right no results message before selecting vendor and after
  // selecting vendor id.
  const noResultsMessage = vendor_id ? (
    <T id={'there_is_no_payable_bills_for_this_vendor_that_can_be_applied_for_this_payment'} />
  ) : (
    <T id={'please_select_a_vendor_to_display_all_open_bills_for_it'} />
  );

  return (
    <CloudLoadingIndicator isLoading={isNewEntriesFetching}>
      <DataTableEditable
        progressBarLoading={isNewEntriesFetching}
        className={classNames(CLASSES.DATATABLE_EDITOR_ITEMS_ENTRIES)}
        columns={columns}
        data={entries}
        spinnerProps={false}
        payload={{
          errors: errors?.entries || [],
          updateData: handleUpdateData,
          currencyCode,
        }}
        noResults={noResultsMessage}
      />
    </CloudLoadingIndicator>
  );
}
