// @ts-nocheck
import React from 'react';

import {
  DataTable,
  TableFastCell,
  TableSkeletonHeader,
  TableSkeletonRows,
  TableVirtualizedListRows,
} from '@bigcapital/webapp/components';
import { AccountDialogAction } from '@bigcapital/webapp/containers/Dialogs/AccountDialog/utils';
import { ActionsMenu } from './components';
import { rowClassNames, useAccountsTableColumns } from './utils';

import { useMemorizedColumnsWidths } from '@bigcapital/webapp/hooks';
import { useAccountsChartContext } from './AccountsChartProvider';

import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { TABLES } from '@bigcapital/webapp/constants/tables';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Accounts data-table.
 */
function AccountsDataTable({
  // #withAlertsDialog
  openAlert,

  // #withDialog
  openDialog,

  // #withDrawerActions
  openDrawer,

  // #withSettings
  accountsTableSize,
}) {
  const { isAccountsLoading, isAccountsFetching, accounts } = useAccountsChartContext();

  // Retrieve accounts table columns.
  const columns = useAccountsTableColumns();

  // Handle delete action account.
  const handleDeleteAccount = (account) => {
    openAlert('account-delete', { accountId: account.id });
  };

  // Handle activate action account.
  const handleActivateAccount = (account) => {
    openAlert('account-activate', { accountId: account.id });
  };

  // Handle inactivate action account.
  const handleInactivateAccount = (account) => {
    openAlert('account-inactivate', { accountId: account.id });
  };

  // Handle edit account action.
  const handleEditAccount = (account) => {
    openDialog(DialogsName.AccountForm, {
      action: AccountDialogAction.Edit,
      accountId: account.id,
    });
  };

  // Handle view detail account.
  const handleViewDetailAccount = ({ id }) => {
    openDrawer(DRAWERS.ACCOUNT_DETAILS, { accountId: id });
  };

  // Handle new child button click.
  const handleNewChildAccount = (account) => {
    openDialog(DialogsName.AccountForm, {
      action: AccountDialogAction.NewChild,
      parentAccountId: account.id,
      accountType: account.account_type,
    });
  };
  // Handle cell click.
  const handleCellClick = (cell, event) => {
    openDrawer(DRAWERS.ACCOUNT_DETAILS, { accountId: cell.row.original.id });
  };
  // Local storage memorizing columns widths.
  const [initialColumnsWidths, , handleColumnResizing] = useMemorizedColumnsWidths(TABLES.ACCOUNTS);

  return (
    <DataTable
      noInitialFetch={true}
      columns={columns}
      data={accounts}
      selectionColumn={true}
      expandable={true}
      sticky={true}
      loading={isAccountsLoading}
      headerLoading={isAccountsLoading}
      progressBarLoading={isAccountsFetching}
      rowClassNames={rowClassNames}
      autoResetExpanded={false}
      autoResetSortBy={false}
      autoResetSelectedRows={false}
      expandColumnSpace={1}
      expandToggleColumn={2}
      selectionColumnWidth={45}
      TableCellRenderer={TableFastCell}
      TableRowsRenderer={TableVirtualizedListRows}
      TableLoadingRenderer={TableSkeletonRows}
      TableHeaderSkeletonRenderer={TableSkeletonHeader}
      ContextMenu={ActionsMenu}
      // #TableVirtualizedListRows props.
      vListrowHeight={accountsTableSize == 'small' ? 40 : 42}
      vListOverscanRowCount={0}
      onCellClick={handleCellClick}
      initialColumnsWidths={initialColumnsWidths}
      onColumnResizing={handleColumnResizing}
      size={accountsTableSize}
      payload={{
        onEdit: handleEditAccount,
        onDelete: handleDeleteAccount,
        onActivate: handleActivateAccount,
        onInactivate: handleInactivateAccount,
        onNewChild: handleNewChildAccount,
        onViewDetails: handleViewDetailAccount,
      }}
    />
  );
}

export default compose(
  withAlertsActions,
  withDrawerActions,
  withDialogActions,
  withSettings(({ accountsSettings }) => ({
    accountsTableSize: accountsSettings.tableSize,
  })),
)(AccountsDataTable);
