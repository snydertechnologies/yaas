import { Alignment, Button, Classes, Intent, NavbarDivider, NavbarGroup, Switch } from '@blueprintjs/core';
import { isEmpty } from 'lodash';
// @ts-nocheck
import React from 'react';

import {
  AdvancedFilterPopover,
  Can,
  DashboardActionViewsList,
  DashboardActionsBar,
  DashboardFilterButton,
  DashboardRowsHeightButton,
  Icon,
  If,
  FormattedMessage as T,
} from '@bigcapital/webapp/components';

import { AbilitySubject, AccountAction } from '@bigcapital/webapp/constants/abilityOption';
import { DialogsName } from '@bigcapital/webapp/constants/dialogs';

import { useRefreshAccounts } from '@bigcapital/webapp/hooks/query/accounts';
import { useAccountsChartContext } from './AccountsChartProvider';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import withSettingsActions from '@bigcapital/webapp/containers/Settings/withSettingsActions';
import withAccounts from './withAccounts';
import withAccountsTableActions from './withAccountsTableActions';

import { compose } from '@bigcapital/webapp/utils';
import { useHistory } from 'react-router-dom';

/**
 * Accounts actions bar.
 */
function AccountsActionsBar({
  // #withDialogActions
  openDialog,

  // #withAccounts
  accountsSelectedRows,
  accountsInactiveMode,
  accountsFilterConditions,

  // #withAlertActions
  openAlert,

  // #withAccountsTableActions
  setAccountsTableState,

  // #ownProps
  onFilterChanged,

  // #withSettings
  accountsTableSize,

  // #withSettingsActions
  addSetting,
}) {
  const { resourceViews, fields } = useAccountsChartContext();

  const history = useHistory();

  const onClickNewAccount = () => {
    openDialog(DialogsName.AccountForm, {});
  };

  // Accounts refresh action.
  const { refresh } = useRefreshAccounts();

  // Handle bulk accounts delete.
  const handleBulkDelete = () => {
    openAlert('accounts-bulk-delete', { accountsIds: accountsSelectedRows });
  };

  // Handle bulk accounts activate.
  const handelBulkActivate = () => {
    openAlert('accounts-bulk-activate', { accountsIds: accountsSelectedRows });
  };

  // Handle bulk accounts inactivate.
  const handelBulkInactive = () => {
    openAlert('accounts-bulk-inactivate', {
      accountsIds: accountsSelectedRows,
    });
  };

  // Handle tab changing.
  const handleTabChange = (view) => {
    setAccountsTableState({ viewSlug: view ? view.slug : null });
  };

  // Handle inactive switch changing.
  const handleInactiveSwitchChange = (event) => {
    const checked = event.target.checked;
    setAccountsTableState({ inactiveMode: checked });
  };

  // Handle click a refresh accounts
  const handleRefreshBtnClick = () => {
    refresh();
  };

  // Handle table row size change.
  const handleTableRowSizeChange = (size) => {
    addSetting('accounts', 'tableSize', size);
  };
  // handle the import button click.
  const handleImportBtnClick = () => {
    history.push('/accounts/import');
  };
  // Handle the export button click.
  const handleExportBtnClick = () => {
    openDialog(DialogsName.Export, { resource: 'account' });
  };

  return (
    <DashboardActionsBar>
      <NavbarGroup>
        <DashboardActionViewsList
          resourceName={'accounts'}
          allMenuItem={true}
          allMenuItemText={<T id={'all_accounts'} />}
          views={resourceViews}
          onChange={handleTabChange}
        />
        <NavbarDivider />
        <Can I={AccountAction.Create} a={AbilitySubject.Account}>
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon="plus" />}
            text={<T id={'new_account'} />}
            onClick={onClickNewAccount}
          />
        </Can>
        <AdvancedFilterPopover
          advancedFilterProps={{
            conditions: accountsFilterConditions,
            defaultFieldKey: 'name',
            fields: fields,
            onFilterChange: (filterConditions) => {
              setAccountsTableState({ filterRoles: filterConditions });
            },
          }}
        >
          <DashboardFilterButton conditionsCount={accountsFilterConditions.length} />
        </AdvancedFilterPopover>

        <NavbarDivider />

        <If condition={!isEmpty(accountsSelectedRows)}>
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon="play-16" iconSize={16} />}
            text={<T id={'activate'} />}
            onClick={handelBulkActivate}
          />
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon="pause-16" iconSize={16} />}
            text={<T id={'inactivate'} />}
            onClick={handelBulkInactive}
          />
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon="trash-16" iconSize={16} />}
            text={<T id={'delete'} />}
            intent={Intent.DANGER}
            onClick={handleBulkDelete}
          />
        </If>

        <Button className={Classes.MINIMAL} icon={<Icon icon="print-16" iconSize={16} />} text={<T id={'print'} />} />
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="file-import-16" iconSize={16} />}
          text={<T id={'import'} />}
          onClick={handleImportBtnClick}
        />
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="file-export-16" iconSize={16} />}
          text={<T id={'export'} />}
          onClick={handleExportBtnClick}
        />
        <NavbarDivider />
        <DashboardRowsHeightButton initialValue={accountsTableSize} onChange={handleTableRowSizeChange} />
        <NavbarDivider />
        <Can I={AccountAction.Edit} a={AbilitySubject.Account}>
          <Switch
            labelElement={<T id={'inactive'} />}
            defaultChecked={accountsInactiveMode}
            onChange={handleInactiveSwitchChange}
          />
        </Can>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="refresh-16" iconSize={14} />}
          onClick={handleRefreshBtnClick}
        />
      </NavbarGroup>
    </DashboardActionsBar>
  );
}

export default compose(
  withDialogActions,
  withAlertActions,
  withSettingsActions,
  withAccounts(({ accountsSelectedRows, accountsTableState }) => ({
    accountsSelectedRows,
    accountsInactiveMode: accountsTableState.inactiveMode,
    accountsFilterConditions: accountsTableState.filterRoles,
  })),
  withSettings(({ accountsSettings }) => ({
    accountsTableSize: accountsSettings.tableSize,
  })),
  withAccountsTableActions,
)(AccountsActionsBar);
