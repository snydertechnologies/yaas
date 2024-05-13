// @ts-nocheck
import React, { useEffect } from 'react';

import '@bigcapital/webapp/style/pages/Accounts/List.scss';
import { DashboardContentTable, DashboardPageContent } from '@bigcapital/webapp/components';

import AccountsActionsBar from './AccountsActionsBar';
import { AccountsChartProvider } from './AccountsChartProvider';
import AccountsDataTable from './AccountsDataTable';
import AccountsViewsTabs from './AccountsViewsTabs';

import withAccounts from '@bigcapital/webapp/containers/Accounts/withAccounts';
import { compose } from '@bigcapital/webapp/utils';
import { transformAccountsStateToQuery } from './utils';
import withAccountsTableActions from './withAccountsTableActions';

/**
 * Accounts chart list.
 */
function AccountsChart({
  // #withAccounts
  accountsTableState,
  accountsTableStateChanged,

  // #withAccountsActions
  resetAccountsTableState,
}) {
  // Resets the accounts table state once the page unmount.
  useEffect(
    () => () => {
      resetAccountsTableState();
    },
    [resetAccountsTableState],
  );

  return (
    <AccountsChartProvider
      query={transformAccountsStateToQuery(accountsTableState)}
      tableStateChanged={accountsTableStateChanged}
    >
      <AccountsActionsBar />

      <DashboardPageContent>
        <AccountsViewsTabs />

        <DashboardContentTable>
          <AccountsDataTable />
        </DashboardContentTable>
      </DashboardPageContent>
    </AccountsChartProvider>
  );
}

export default compose(
  withAccounts(({ accountsTableState, accountsTableStateChanged }) => ({
    accountsTableState,
    accountsTableStateChanged,
  })),
  withAccountsTableActions,
)(AccountsChart);
