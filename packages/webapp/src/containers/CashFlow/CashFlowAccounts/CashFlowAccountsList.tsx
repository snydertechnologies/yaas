import { compose } from 'lodash/fp';
// @ts-nocheck
import React, { useEffect } from 'react';

import '@bigcapital/webapp/style/pages/CashFlow/CashFlowAccounts/List.scss';

import { DashboardPageContent } from '@bigcapital/webapp/components';
import { CashFlowAccountsProvider } from './CashFlowAccountsProvider';

import CashFlowAccountsActionsBar from './CashFlowAccountsActionsBar';
import CashflowAccountsGrid from './CashflowAccountsGrid';
import { CashflowAccountsPlaidLink } from './CashflowAccountsPlaidLink';

import withCashflowAccounts from '@bigcapital/webapp/containers/CashFlow/AccountTransactions/withCashflowAccounts';
import withCashflowAccountsTableActions from '@bigcapital/webapp/containers/CashFlow/AccountTransactions/withCashflowAccountsTableActions';

/**
 * Cashflow accounts list.
 */
function CashFlowAccountsList({
  // #withCashflowAccounts
  cashflowAccountsTableState,

  // #withCashflowAccountsTableActions
  resetCashflowAccountsTableState,
}) {
  // Resets the cashflow accounts table state.
  useEffect(
    () => () => {
      resetCashflowAccountsTableState();
    },
    [resetCashflowAccountsTableState],
  );

  return (
    <CashFlowAccountsProvider tableState={cashflowAccountsTableState}>
      <CashFlowAccountsActionsBar />

      <DashboardPageContent>
        <CashflowAccountsGrid />
      </DashboardPageContent>

      <CashflowAccountsPlaidLink />
    </CashFlowAccountsProvider>
  );
}

export default compose(
  withCashflowAccounts(({ cashflowAccountsTableState }) => ({
    cashflowAccountsTableState,
  })),
  withCashflowAccountsTableActions,
)(CashFlowAccountsList);
