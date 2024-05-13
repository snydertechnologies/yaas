import { Alignment, Navbar, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import { DashboardViewsTabs } from '@bigcapital/webapp/components';

import { useExpensesListContext } from './ExpensesListProvider';
import withExpenses from './withExpenses';
import withExpensesActions from './withExpensesActions';

import { compose, transfromViewsToTabs } from '@bigcapital/webapp/utils';

/**
 * Expesne views tabs.
 */
function ExpenseViewTabs({
  // #withExpensesActions
  setExpensesTableState,

  // #withExpenses
  expensesCurrentView,
}) {
  // Expenses list context.
  const { expensesViews } = useExpensesListContext();

  // Handle the tabs change.
  const handleTabChange = (viewSlug) => {
    setExpensesTableState({
      viewSlug: viewSlug || null,
    });
  };

  const tabs = transfromViewsToTabs(expensesViews);

  // Handle click a new view tab.
  const handleClickNewView = () => {};

  return (
    <Navbar className={'navbar--dashboard-views'}>
      <NavbarGroup align={Alignment.LEFT}>
        <DashboardViewsTabs
          currentViewSlug={expensesCurrentView}
          resourceName={'expenses'}
          tabs={tabs}
          onNewViewTabClick={handleClickNewView}
          onChange={handleTabChange}
        />
      </NavbarGroup>
    </Navbar>
  );
}

export default compose(
  withExpensesActions,
  withExpenses(({ expensesTableState }) => ({
    expensesCurrentView: expensesTableState.viewSlug,
  })),
)(ExpenseViewTabs);
