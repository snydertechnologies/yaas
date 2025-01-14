import { DialogContent } from '@bigcapital/webapp/components';
import { useCreateLockingTransactoin, useEditTransactionsLocking } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';

const LockingTransactionsContext = React.createContext();

/**
 * Locking transactions form provider.
 */
function LockingTransactionsFormProvider({ moduleName, isEnabled, dialogName, ...props }) {
  // Create locking transactions mutations.
  const { mutateAsync: createLockingTransactionMutate } = useCreateLockingTransactoin();

  const { data: transactionLocking, isLoading: isTransactionsLockingLoading } = useEditTransactionsLocking(moduleName, {
    enabled: !!isEnabled,
  });

  // State provider.
  const provider = {
    dialogName,
    moduleName,
    createLockingTransactionMutate,
    transactionLocking,
    isEnabled,
  };
  return (
    <DialogContent isLoading={isTransactionsLockingLoading}>
      <LockingTransactionsContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useLockingTransactionsContext = () => React.useContext(LockingTransactionsContext);

export { LockingTransactionsFormProvider, useLockingTransactionsContext };
