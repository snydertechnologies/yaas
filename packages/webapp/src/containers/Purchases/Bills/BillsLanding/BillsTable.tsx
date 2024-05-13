// @ts-nocheck
import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import {
  DashboardContentTable,
  DataTable,
  TableSkeletonHeader,
  TableSkeletonRows,
} from '@bigcapital/webapp/components';
import { TABLES } from '@bigcapital/webapp/constants/tables';

import BillsEmptyStatus from './BillsEmptyStatus';

import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import withBills from './withBills';
import withBillActions from './withBillsActions';

import { useMemorizedColumnsWidths } from '@bigcapital/webapp/hooks';
import { useBillsListContext } from './BillsListProvider';
import { ActionsMenu, useBillsTableColumns } from './components';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Bills transactions datatable.
 */
function BillsDataTable({
  // #withBillsActions
  setBillsTableState,

  // #withBills
  billsTableState,

  // #withAlerts
  openAlert,

  // #withDialogActions
  openDialog,

  // #withDrawerActions
  openDrawer,

  // #withSettings
  billsTableSize,
}) {
  // Bills list context.
  const { bills, pagination, isBillsLoading, isBillsFetching, isEmptyStatus } = useBillsListContext();

  const history = useHistory();

  // Bills table columns.
  const columns = useBillsTableColumns();

  const handleFetchData = useCallback(
    ({ pageIndex, pageSize, sortBy }) => {
      setBillsTableState({
        pageIndex,
        pageSize,
        sortBy,
      });
    },
    [setBillsTableState],
  );

  // Handle bill edit action.
  const handleEditBill = (bill) => {
    history.push(`/bills/${bill.id}/edit`);
  };

  // Handle convert to vendor credit.
  const handleConvertToVendorCredit = ({ id }) => {
    history.push(`/vendor-credits/new?from_bill_id=${id}`, { billId: id });
  };

  // Handle bill delete action.
  const handleDeleteBill = (bill) => {
    openAlert('bill-delete', { billId: bill.id });
  };

  // Handle bill open action.
  const handleOpenBill = (bill) => {
    openAlert('bill-open', { billId: bill.id });
  };

  // Handle quick payment made action.
  const handleQuickPaymentMade = ({ id }) => {
    openDialog('quick-payment-made', { billId: id });
  };

  // handle allocate landed cost.
  const handleAllocateLandedCost = ({ id }) => {
    openDialog('allocate-landed-cost', { billId: id });
  };

  // Handle view detail bill.
  const handleViewDetailBill = ({ id }) => {
    openDrawer(DRAWERS.BILL_DETAILS, { billId: id });
  };

  // Handle cell click.
  const handleCellClick = (cell, event) => {
    openDrawer(DRAWERS.BILL_DETAILS, { billId: cell.row.original.id });
  };

  // Local storage memorizing columns widths.
  const [initialColumnsWidths, , handleColumnResizing] = useMemorizedColumnsWidths(TABLES.BILLS);

  if (isEmptyStatus) {
    return <BillsEmptyStatus />;
  }

  return (
    <DashboardContentTable>
      <DataTable
        columns={columns}
        data={bills}
        loading={isBillsLoading}
        headerLoading={isBillsLoading}
        progressBarLoading={isBillsFetching}
        onFetchData={handleFetchData}
        manualSortBy={true}
        selectionColumn={true}
        noInitialFetch={true}
        sticky={true}
        pagination={true}
        pagesCount={pagination.pagesCount}
        TableLoadingRenderer={TableSkeletonRows}
        TableHeaderSkeletonRenderer={TableSkeletonHeader}
        ContextMenu={ActionsMenu}
        onCellClick={handleCellClick}
        initialColumnsWidths={initialColumnsWidths}
        onColumnResizing={handleColumnResizing}
        size={billsTableSize}
        payload={{
          onDelete: handleDeleteBill,
          onEdit: handleEditBill,
          onOpen: handleOpenBill,
          onQuick: handleQuickPaymentMade,
          onAllocateLandedCost: handleAllocateLandedCost,
          onViewDetails: handleViewDetailBill,
          onConvert: handleConvertToVendorCredit,
        }}
      />
    </DashboardContentTable>
  );
}

export default compose(
  withBills(({ billsTableState }) => ({ billsTableState })),
  withBillActions,
  withAlertsActions,
  withDrawerActions,
  withDialogActions,
  withSettings(({ billsettings }) => ({
    billsTableSize: billsettings?.tableSize,
  })),
)(BillsDataTable);
