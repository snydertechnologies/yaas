import { Spinner } from '@blueprintjs/core';
// @ts-nocheck
import React, { Suspense } from 'react';

import '@bigcapital/webapp/style/pages/CashFlow/AccountTransactions/List.scss';

import { DashboardPageContent } from '@bigcapital/webapp/components';

import AccountTransactionsActionsBar from './AccountTransactionsActionsBar';
import { AccountTransactionsDetailsBar } from './AccountTransactionsDetailsBar';
import { AccountTransactionsFilterTabs } from './AccountTransactionsFilterTabs';
import { AccountTransactionsProvider, useAccountTransactionsContext } from './AccountTransactionsProvider';
import { AccountTransactionsProgressBar } from './components';

/**
 * Account transactions list.
 */
function AccountTransactionsList() {
  return (
    <AccountTransactionsProvider>
      <AccountTransactionsActionsBar />
      <AccountTransactionsDetailsBar />
      <AccountTransactionsProgressBar />

      <DashboardPageContent>
        <AccountTransactionsFilterTabs />

        <Suspense fallback={<Spinner size={30} />}>
          <AccountTransactionsContent />
        </Suspense>
      </DashboardPageContent>
    </AccountTransactionsProvider>
  );
}

export default AccountTransactionsList;

const AccountsTransactionsAll = React.lazy(() => import('./AccountsTransactionsAll'));

const AccountsTransactionsUncategorized = React.lazy(() => import('./AllTransactionsUncategorized'));

function AccountTransactionsContent() {
  const { filterTab } = useAccountTransactionsContext();

  return filterTab === 'uncategorized' ? <AccountsTransactionsUncategorized /> : <AccountsTransactionsAll />;
}
