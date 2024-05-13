import {
  DashboardContentTable,
  DataTable,
  TableSkeletonHeader,
  TableSkeletonRows,
} from '@bigcapital/webapp/components';
import { TABLES } from '@bigcapital/webapp/constants/tables';
import { useMemorizedColumnsWidths } from '@bigcapital/webapp/hooks';
// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useWarehouseTranfersListContext } from './WarehouseTransfersListProvider';
import { ActionsMenu, useWarehouseTransfersTableColumns } from './components';

import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import WarehouseTransfersEmptyStatus from './WarehouseTransfersEmptyStatus';
import withWarehouseTransfersActions from './withWarehouseTransfersActions';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Warehouse transfers datatable.
 */
function WarehouseTransfersDataTable({
  // #withWarehouseTransfersActions
  setWarehouseTransferTableState,

  // #withAlertsActions
  openAlert,

  // #withDrawerActions
  openDrawer,

  // #withDialogAction
  openDialog,

  // #withSettings
  warehouseTransferTableSize,
}) {
  const history = useHistory();

  // Warehouse transfers list context.
  const { warehousesTransfers, pagination, isEmptyStatus, isWarehouseTransfersLoading, isWarehouseTransfersFetching } =
    useWarehouseTranfersListContext();

  // Invoices table columns.
  const columns = useWarehouseTransfersTableColumns();

  // Local storage memorizing columns widths.
  const [initialColumnsWidths, , handleColumnResizing] = useMemorizedColumnsWidths(TABLES.WAREHOUSE_TRANSFERS);

  // Handles fetch data once the table state change.
  const handleDataTableFetchData = React.useCallback(
    ({ pageSize, pageIndex, sortBy }) => {
      setWarehouseTransferTableState({
        pageSize,
        pageIndex,
        sortBy,
      });
    },
    [setWarehouseTransferTableState],
  );

  // Display invoice empty status instead of the table.
  if (isEmptyStatus) {
    return <WarehouseTransfersEmptyStatus />;
  }

  // Handle view detail.
  const handleViewDetailWarehouseTransfer = ({ id }) => {
    openDrawer(DRAWERS.WAREHOUSE_TRANSFER_DETAILS, { warehouseTransferId: id });
  };

  // Handle edit warehouse transfer.
  const handleEditWarehouseTransfer = ({ id }) => {
    history.push(`/warehouses-transfers/${id}/edit`);
  };

  // Handle delete warehouse transfer.
  const handleDeleteWarehouseTransfer = ({ id }) => {
    openAlert('warehouse-transfer-delete', { warehouseTransferId: id });
  };

  // Handle initiate warehouse transfer.
  const handleInitateWarehouseTransfer = ({ id }) => {
    openAlert('warehouse-transfer-initate', { warehouseTransferId: id });
  };
  // Handle transferred warehouse transfer.
  const handleTransferredWarehouseTransfer = ({ id }) => {
    openAlert('transferred-warehouse-transfer', { warehouseTransferId: id });
  };

  // Handle cell click.
  const handleCellClick = (cell, event) => {
    openDrawer(DRAWERS.WAREHOUSE_TRANSFER_DETAILS, {
      warehouseTransferId: cell.row.original.id,
    });
  };

  return (
    <DashboardContentTable>
      <DataTable
        columns={columns}
        data={warehousesTransfers}
        loading={isWarehouseTransfersLoading}
        headerLoading={isWarehouseTransfersLoading}
        progressBarLoading={isWarehouseTransfersFetching}
        onFetchData={handleDataTableFetchData}
        manualSortBy={true}
        selectionColumn={true}
        noInitialFetch={true}
        sticky={true}
        pagination={true}
        manualPagination={true}
        pagesCount={pagination.pagesCount}
        autoResetSortBy={false}
        autoResetPage={false}
        TableLoadingRenderer={TableSkeletonRows}
        TableHeaderSkeletonRenderer={TableSkeletonHeader}
        ContextMenu={ActionsMenu}
        onCellClick={handleCellClick}
        initialColumnsWidths={initialColumnsWidths}
        onColumnResizing={handleColumnResizing}
        size={warehouseTransferTableSize}
        payload={{
          onViewDetails: handleViewDetailWarehouseTransfer,
          onDelete: handleDeleteWarehouseTransfer,
          onEdit: handleEditWarehouseTransfer,
          onInitate: handleInitateWarehouseTransfer,
          onTransfer: handleTransferredWarehouseTransfer,
        }}
      />
    </DashboardContentTable>
  );
}
export default compose(
  withDashboardActions,
  withWarehouseTransfersActions,
  withAlertsActions,
  withDrawerActions,
  withDialogActions,
  withSettings(({ warehouseTransferSettings }) => ({
    warehouseTransferTableSize: warehouseTransferSettings?.tableSize,
  })),
)(WarehouseTransfersDataTable);
