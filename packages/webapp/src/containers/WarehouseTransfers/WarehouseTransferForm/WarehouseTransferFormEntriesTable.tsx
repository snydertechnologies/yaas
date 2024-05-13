// @ts-nocheck
import React from 'react';

import { DataTableEditable } from '@bigcapital/webapp/components';
import { useDeepCompareEffect } from '@bigcapital/webapp/hooks/utils';
import { useWarehouseTransferTableColumns } from '../utils';
import { useWarehouseTransferFormContext } from './WarehouseTransferFormProvider';
import { useFetchItemWarehouseQuantity } from './hooks';

import { saveInvoke } from '@bigcapital/webapp/utils';
import { deleteTableRow, mutateTableCell, mutateTableRow } from './utils';

/**
 * Warehouse transfer form entries table.
 */
export default function WarehouseTransferFormEntriesTable({
  // #ownProps
  items,
  entries,
  defaultEntry,
  onUpdateData,
  errors,

  destinationWarehouseId,
  sourceWarehouseId,
}) {
  // Fetch the table row.
  const { newRowMeta, setTableRow, resetTableRow, cellsLoading } = useFetchItemWarehouseQuantity();

  // Warehouse transfer provider context.
  const { isItemsCostFetching } = useWarehouseTransferFormContext();

  // Retrieve the warehouse transfer table columns.
  const columns = useWarehouseTransferTableColumns();

  // Observes the new row meta to call `onUpdateData` callback.
  useDeepCompareEffect(() => {
    if (newRowMeta) {
      const newRow = {
        item_id: newRowMeta.itemId,
        warehouses: newRowMeta.warehouses,
        description: '',
        quantity: '',
      };
      const newRows = mutateTableRow(newRowMeta.rowIndex, newRow, entries);

      saveInvoke(onUpdateData, newRows);
      resetTableRow();
    }
  }, [newRowMeta]);

  // Handle update data.
  const handleUpdateData = React.useCallback(
    (rowIndex, columnId, itemId) => {
      if (columnId === 'item_id') {
        setTableRow({
          rowIndex,
          columnId,
          itemId,
          sourceWarehouseId,
          destinationWarehouseId,
        });
      }
      const editCell = mutateTableCell(rowIndex, columnId, defaultEntry);
      const newRows = editCell(itemId, entries);

      saveInvoke(onUpdateData, newRows);
    },
    [entries, defaultEntry, onUpdateData, destinationWarehouseId, sourceWarehouseId, setTableRow],
  );
  // Handles click remove datatable row.
  const handleRemoveRow = React.useCallback(
    (rowIndex) => {
      const newRows = deleteTableRow(rowIndex, defaultEntry, entries);
      saveInvoke(onUpdateData, newRows);
    },
    [entries, defaultEntry, onUpdateData],
  );

  return (
    <DataTableEditable
      columns={columns}
      data={entries}
      cellsLoading={!!cellsLoading}
      cellsLoadingCoords={cellsLoading}
      progressBarLoading={isItemsCostFetching || cellsLoading}
      payload={{
        items,
        errors: errors || [],
        updateData: handleUpdateData,
        removeRow: handleRemoveRow,
        autoFocus: ['item_id', 0],

        sourceWarehouseId,
        destinationWarehouseId,
      }}
    />
  );
}
