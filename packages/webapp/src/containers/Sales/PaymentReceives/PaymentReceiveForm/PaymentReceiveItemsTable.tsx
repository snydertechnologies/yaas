import { CloudLoadingIndicator } from '@bigcapital/webapp/components';
import { FormattedMessage as T } from '@bigcapital/webapp/components';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React, { useCallback } from 'react';

import { DataTableEditable } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { compose, updateTableCell } from '@bigcapital/webapp/utils';
import { usePaymentReceiveInnerContext } from './PaymentReceiveInnerProvider';
import { usePaymentReceiveEntriesColumns } from './components';

/**
 * Payment receive items table.
 */
export default function PaymentReceiveItemsTable({ entries, onUpdateData, currencyCode }) {
  // Payment receive form context.
  const { isDueInvoicesFetching } = usePaymentReceiveInnerContext();

  // Payment receive entries form context.
  const columns = usePaymentReceiveEntriesColumns();

  // Formik context.
  const {
    values: { customer_id },
    errors,
  } = useFormikContext();

  // No results message.
  const noResultsMessage = customer_id ? (
    <T id={'there_is_no_receivable_invoices_for_this_customer'} />
  ) : (
    <T id={'please_select_a_customer_to_display_all_open_invoices_for_it'} />
  );

  // Handle update data.
  const handleUpdateData = useCallback(
    (rowIndex, columnId, value) => {
      const newRows = compose(updateTableCell(rowIndex, columnId, value))(entries);

      onUpdateData(newRows);
    },
    [entries, onUpdateData],
  );

  return (
    <CloudLoadingIndicator isLoading={isDueInvoicesFetching}>
      <DataTableEditable
        progressBarLoading={isDueInvoicesFetching}
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
