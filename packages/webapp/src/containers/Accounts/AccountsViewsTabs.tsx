import { Alignment, Navbar, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React, { useCallback } from 'react';
import intl from 'react-intl-universal';

import { DashboardViewsTabs } from '@bigcapital/webapp/components';
import { useAccountsChartContext } from './AccountsChartProvider';

import withAccounts from './withAccounts';
import withAccountsTableActions from './withAccountsTableActions';

import { compose, transfromViewsToTabs } from '@bigcapital/webapp/utils';

/**
 * Accounts views tabs.
 */
function AccountsViewsTabs({
  // #withAccountsTableActions
  setAccountsTableState,

  // #withAccounts
  accountsCurrentView,
}) {
  // Accounts chart context.
  const { resourceViews } = useAccountsChartContext();

  // Handles the tab change.
  const handleTabChange = useCallback(
    (viewSlug) => {
      setAccountsTableState({
        viewSlug: viewSlug || null,
      });
    },
    [setAccountsTableState],
  );

  // Transfromes the accounts views to tabs.
  const tabs = transfromViewsToTabs(resourceViews);

  return (
    <Navbar className="navbar--dashboard-views">
      <NavbarGroup align={Alignment.LEFT}>
        <DashboardViewsTabs
          defaultTabText={intl.get('all_accounts_')}
          currentViewSlug={accountsCurrentView}
          resourceName={'accounts'}
          onChange={handleTabChange}
          tabs={tabs}
        />
      </NavbarGroup>
    </Navbar>
  );
}

export default compose(
  withAccountsTableActions,
  withAccounts(({ accountsTableState }) => ({
    accountsCurrentView: accountsTableState.viewSlug,
  })),
)(AccountsViewsTabs);
