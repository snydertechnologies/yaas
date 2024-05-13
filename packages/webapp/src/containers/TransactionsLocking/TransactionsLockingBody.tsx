import * as R from 'ramda';
// @ts-nocheck
import React from 'react';
import { TransactionLockingSkeletonList, TransactionsLockingFull, TransactionsLockingList } from './components';

import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';

import { useTransactionsLockingContext } from './TransactionsLockingProvider';

/**
 * Transactions locking body.
 * @returns {JSX}
 */
function TransactionsLockingBodyJsx({
  // #withDialogActions
  openDialog,

  // #withAlertsActions
  openAlert,
}) {
  const { isTransactionLockingLoading, transactionLockingType } = useTransactionsLockingContext();

  // Handle locking transactions.
  const handleLockingTransactions = (module, {}, isEnabled) => {
    openDialog('locking-transactions', {
      isEnabled: isEnabled,
      module: module,
    });
  };
  // Handle unlocking transactions
  const handleUnlockTransactions = (module) => {
    openDialog('unlocking-transactions', { module: module });
  };
  // Handle unlocking transactions
  const handleUnlockingPartial = (module) => {
    openDialog('unlocking-partial-transactions', { module: module });
  };
  // Handle cancel partial unlocking.
  const handleCancelUnlockingPartail = (module) => {
    openAlert('cancel-unlocking-partail', { module: module });
  };

  return !isTransactionLockingLoading ? (
    transactionLockingType === 'partial' ? (
      <TransactionsLockingList
        onLock={handleLockingTransactions}
        onEditLock={handleLockingTransactions}
        onCancelLock={handleUnlockTransactions}
        onUnlockPartial={handleUnlockingPartial}
        onCancelUnlockPartial={handleCancelUnlockingPartail}
      />
    ) : (
      <TransactionsLockingFull
        onLock={handleLockingTransactions}
        onCancelLock={handleUnlockTransactions}
        onUnlockPartial={handleUnlockingPartial}
        onCancelUnlockPartial={handleCancelUnlockingPartail}
      />
    )
  ) : (
    <TransactionLockingSkeletonList />
  );
}

export const TransactionsLockingBody = R.compose(withAlertsActions, withDialogActions)(TransactionsLockingBodyJsx);
