import { DialogContent } from '@bigcapital/webapp/components';
import { useCancelLockingTransaction } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';

const UnlockingTransactionsContext = React.createContext();

/**
 * Unlocking transactions form provider.
 */
function UnlockingTransactionsFormProvider({ moduleName, dialogName, ...props }) {
  // Cancle locking transactions mutations.
  const { mutateAsync: cancelLockingTransactionMutate } = useCancelLockingTransaction();

  // State provider.
  const provider = {
    dialogName,
    moduleName,
    cancelLockingTransactionMutate,
  };

  return (
    <DialogContent>
      <UnlockingTransactionsContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useUnlockingTransactionsContext = () => React.useContext(UnlockingTransactionsContext);

export { useUnlockingTransactionsContext, UnlockingTransactionsFormProvider };
