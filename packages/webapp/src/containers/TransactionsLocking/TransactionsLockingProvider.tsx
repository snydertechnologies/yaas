import { DashboardInsider } from '@bigcapital/webapp/components/Dashboard';
import { useTransactionsLocking } from '@bigcapital/webapp/hooks/query';
import { useWatchImmediate } from '@bigcapital/webapp/hooks/utils/useWatch';
// @ts-nocheck
import React from 'react';

const TransactionsLockingContext = React.createContext();

/**
 * Transactions locking data provider.
 */
function TransactionsLockingProvider({ ...props }) {
  // Fetch transaction locking modules list.
  const {
    data: transactionsLocking,
    isFetching: isTransactionLockingFetching,
    isLoading: isTransactionLockingLoading,
  } = useTransactionsLocking();

  // Transactions locking type.
  const [transactionLockingType, setTransactionLockingType] = React.useState('partial');

  // Locking type controlled from response.
  useWatchImmediate(() => {
    if (transactionsLocking.locking_type) {
      setTransactionLockingType(transactionsLocking.locking_type);
    }
  }, transactionsLocking.locking_type);

  // Provider
  const provider = {
    transactionsLocking,
    isTransactionLockingFetching,
    isTransactionLockingLoading,

    transactionLockingType,
    setTransactionLockingType,
  };

  return (
    <DashboardInsider>
      <TransactionsLockingContext.Provider value={provider} {...props} />
    </DashboardInsider>
  );
}

const useTransactionsLockingContext = () => React.useContext(TransactionsLockingContext);

export { TransactionsLockingProvider, useTransactionsLockingContext };
