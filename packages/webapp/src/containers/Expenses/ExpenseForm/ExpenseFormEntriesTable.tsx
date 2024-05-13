// @ts-nocheck
import React, { useCallback } from 'react';

import { DataTableEditable } from '@bigcapital/webapp/components';
import {
  compose,
  saveInvoke,
  updateAutoAddNewLine,
  updateMinEntriesLines,
  updateRemoveLineByIndex,
  updateTableCell,
} from '@bigcapital/webapp/utils';
import { useExpenseFormContext } from './ExpenseFormPageProvider';
import { useExpenseFormTableColumns } from './components';

/**
 * Expenses form entries.
 */
export default function ExpenseFormEntriesTable({
  // #ownPorps
  entries,
  defaultEntry,
  error,
  onChange,
  currencyCode,
  landedCost = true,
  minLines,
}) {
  // Expense form context.
  const { accounts, projects } = useExpenseFormContext();

  // Memorized data table columns.
  const columns = useExpenseFormTableColumns({ landedCost });

  // Handles update datatable data.
  const handleUpdateData = useCallback(
    (rowIndex, columnId, value) => {
      const newRows = compose(
        // Update auto-adding new line.
        updateAutoAddNewLine(defaultEntry, ['expense_account_id']),
        // Update the row value of the given row index and column id.
        updateTableCell(rowIndex, columnId, value),
      )(entries);

      saveInvoke(onChange, newRows);
    },
    [entries, defaultEntry, onChange],
  );

  // Handles click remove datatable row.
  const handleRemoveRow = useCallback(
    (rowIndex) => {
      const newRows = compose(
        // Ensure minimum lines count.
        updateMinEntriesLines(minLines, defaultEntry),
        // Remove the line by the given index.
        updateRemoveLineByIndex(rowIndex),
      )(entries);

      saveInvoke(onChange, newRows);
    },
    [minLines, entries, defaultEntry, onChange],
  );

  return (
    <DataTableEditable
      name={'expense-form'}
      columns={columns}
      data={entries}
      sticky={true}
      payload={{
        accounts: accounts,
        projects: projects,
        errors: error,
        updateData: handleUpdateData,
        removeRow: handleRemoveRow,
        autoFocus: ['expense_account_id', 0],
        currencyCode,
      }}
    />
  );
}

ExpenseFormEntriesTable.defaultProps = {
  minLines: 1,
};
