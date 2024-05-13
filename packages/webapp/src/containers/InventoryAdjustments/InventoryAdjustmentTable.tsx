// @ts-nocheck
import React, { useCallback } from 'react';
import intl from 'react-intl-universal';

import { DataTable } from '@bigcapital/webapp/components';
import { TABLES } from '@bigcapital/webapp/constants/tables';
import { useMemorizedColumnsWidths } from '@bigcapital/webapp/hooks';
import { useInventoryAdjustmentsContext } from './InventoryAdjustmentsProvider';
import { ActionsMenu, useInventoryAdjustmentsColumns } from './components';

import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
import withInventoryAdjustmentActions from './withInventoryAdjustmentActions';
import withInventoryAdjustments from './withInventoryAdjustments';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Inventory adjustments datatable.
 */
function InventoryAdjustmentDataTable({
  // #withInventoryAdjustmentsActions
  setInventoryAdjustmentTableState,

  // #withInventoryAdjustments
  inventoryAdjustmentTableState,

  // #withAlertsActions
  openAlert,

  // #withDrawerActions
  openDrawer,

  // #ownProps
  tableProps,
}) {
  const {
    isAdjustmentsLoading,
    isAdjustmentsFetching,

    inventoryAdjustments,
    pagination,
  } = useInventoryAdjustmentsContext();

  // Handle delete inventory adjustment transaction.
  const handleDeleteAdjustment = ({ id }) => {
    openAlert('inventory-adjustment-delete', { inventoryId: id });
  };

  // Handle the inventory adjustment publish action.
  const handlePublishInventoryAdjustment = ({ id }) => {
    openAlert('inventory-adjustment-publish', { inventoryId: id });
  };
  // Handle view detail inventory adjustment.
  const handleViewDetailInventoryAdjustment = ({ id }) => {
    openDrawer(DRAWERS.INVENTORY_ADJUSTMENT_DETAILS, { inventoryId: id });
  };

  // Inventory adjustments columns.
  const columns = useInventoryAdjustmentsColumns();

  const [initialColumnsWidths, , handleColumnResizing] = useMemorizedColumnsWidths(TABLES.INVENTORY_ADJUSTMENTS);

  // Handle the table fetch data once states changing.
  const handleDataTableFetchData = useCallback(
    ({ pageSize, pageIndex, sortBy }) => {
      setInventoryAdjustmentTableState({
        pageSize,
        pageIndex,
        sortBy,
      });
    },
    [setInventoryAdjustmentTableState],
  );
  // Handle cell click.
  const handleCellClick = (cell, event) => {
    openDrawer(DRAWERS.INVENTORY_ADJUSTMENT_DETAILS, {
      inventoryId: cell.row.original.id,
    });
  };
  return (
    <DataTable
      columns={columns}
      data={inventoryAdjustments}
      loading={isAdjustmentsLoading}
      headerLoading={isAdjustmentsLoading}
      progressBarLoading={isAdjustmentsFetching}
      noInitialFetch={true}
      onFetchData={handleDataTableFetchData}
      manualSortBy={true}
      selectionColumn={true}
      pagination={true}
      pagesCount={pagination.pagesCount}
      autoResetSortBy={false}
      autoResetPage={false}
      onCellClick={handleCellClick}
      initialColumnsWidths={initialColumnsWidths}
      onColumnResizing={handleColumnResizing}
      payload={{
        onDelete: handleDeleteAdjustment,
        onPublish: handlePublishInventoryAdjustment,
        onViewDetails: handleViewDetailInventoryAdjustment,
      }}
      ContextMenu={ActionsMenu}
      noResults={intl.get('there_is_no_inventory_adjustments_transactions_yet')}
      {...tableProps}
    />
  );
}

export default compose(
  withAlertsActions,
  withInventoryAdjustmentActions,
  withDrawerActions,
  withInventoryAdjustments(({ inventoryAdjustmentTableState }) => ({
    inventoryAdjustmentTableState,
  })),
)(InventoryAdjustmentDataTable);
