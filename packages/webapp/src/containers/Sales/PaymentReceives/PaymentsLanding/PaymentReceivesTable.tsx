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
import { compose } from '@bigcapital/webapp/utils';

import PaymentReceivesEmptyStatus from './PaymentReceivesEmptyStatus';

import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import withPaymentReceives from './withPaymentReceives';
import withPaymentReceivesActions from './withPaymentReceivesActions';

import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { useMemorizedColumnsWidths } from '@bigcapital/webapp/hooks';
import { usePaymentReceivesListContext } from './PaymentReceiptsListProvider';
import { ActionsMenu, usePaymentReceivesColumns } from './components';

/**
 * Payment receives datatable.
 */
function PaymentReceivesDataTable({
  // #withPaymentReceivesActions
  setPaymentReceivesTableState,

  // #withAlertsActions
  openAlert,

  // #withDrawerActions
  openDrawer,

  // #withDialogActions
  openDialog,

  // #withSettings
  paymentReceivesTableSize,
}) {
  const history = useHistory();

  // Payment receives list context.
  const {
    paymentReceives,
    pagination,

    isPaymentReceivesLoading,
    isPaymentReceivesFetching,
    isEmptyStatus,
  } = usePaymentReceivesListContext();

  // Payment receives columns.
  const columns = usePaymentReceivesColumns();

  // Handles edit payment receive.
  const handleEditPaymentReceive = ({ id }) => {
    history.push(`/payment-receives/${id}/edit`);
  };

  // Handles delete payment receive.
  const handleDeletePaymentReceive = ({ id }) => {
    openAlert('payment-receive-delete', { paymentReceiveId: id });
  };

  // Handle view detail  payment receive..
  const handleViewDetailPaymentReceive = ({ id }) => {
    openDrawer(DRAWERS.PAYMENT_RECEIVE_DETAILS, { paymentReceiveId: id });
  };

  // Handle mail send payment receive.
  const handleSendMailPayment = ({ id }) => {
    openDialog(DialogsName.PaymentMail, { paymentReceiveId: id });
  };

  // Handle cell click.
  const handleCellClick = (cell, event) => {
    openDrawer(DRAWERS.PAYMENT_RECEIVE_DETAILS, {
      paymentReceiveId: cell.row.original.id,
    });
  };

  // Local storage memorizing columns widths.
  const [initialColumnsWidths, , handleColumnResizing] = useMemorizedColumnsWidths(TABLES.PAYMENT_RECEIVES);

  // Handle datatable fetch once the table's state changing.
  const handleDataTableFetchData = useCallback(
    ({ pageIndex, pageSize, sortBy }) => {
      setPaymentReceivesTableState({
        pageIndex,
        pageSize,
        sortBy,
      });
    },
    [setPaymentReceivesTableState],
  );

  // Display empty status instead of the table.
  if (isEmptyStatus) {
    return <PaymentReceivesEmptyStatus />;
  }

  return (
    <DashboardContentTable>
      <DataTable
        columns={columns}
        data={paymentReceives}
        loading={isPaymentReceivesLoading}
        headerLoading={isPaymentReceivesLoading}
        progressBarLoading={isPaymentReceivesFetching}
        onFetchData={handleDataTableFetchData}
        manualSortBy={true}
        selectionColumn={true}
        noInitialFetch={true}
        sticky={true}
        autoResetSortBy={false}
        autoResetPage={false}
        pagination={true}
        pagesCount={pagination.pagesCount}
        TableLoadingRenderer={TableSkeletonRows}
        TableHeaderSkeletonRenderer={TableSkeletonHeader}
        ContextMenu={ActionsMenu}
        onCellClick={handleCellClick}
        initialColumnsWidths={initialColumnsWidths}
        onColumnResizing={handleColumnResizing}
        size={paymentReceivesTableSize}
        payload={{
          onDelete: handleDeletePaymentReceive,
          onEdit: handleEditPaymentReceive,
          onViewDetails: handleViewDetailPaymentReceive,
          onSendMail: handleSendMailPayment,
        }}
      />
    </DashboardContentTable>
  );
}

export default compose(
  withPaymentReceivesActions,
  withAlertsActions,
  withDrawerActions,
  withDialogActions,
  withPaymentReceives(({ paymentReceivesTableState }) => ({
    paymentReceivesTableState,
  })),
  withSettings(({ paymentReceiveSettings }) => ({
    paymentReceivesTableSize: paymentReceiveSettings?.tableSize,
  })),
)(PaymentReceivesDataTable);
