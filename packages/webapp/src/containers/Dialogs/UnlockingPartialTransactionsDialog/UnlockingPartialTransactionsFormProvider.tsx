import { DialogContent } from '@bigcapital/webapp/components';
import { useCreateUnlockingPartialTransactions } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';

const UnlockingPartialTransactionsContext = React.createContext();

/**
 * Unlocking partial transactions form provider.
 */
function UnlockingPartialTransactionsFormProvider({ moduleName, dialogName, ...props }) {
  // Create unlocking partial transactions mutations.
  const { mutateAsync: createUnlockingPartialTransactionsMutate } = useCreateUnlockingPartialTransactions();

  // State provider.
  const provider = {
    dialogName,
    moduleName,
    createUnlockingPartialTransactionsMutate,
  };

  return (
    <DialogContent>
      <UnlockingPartialTransactionsContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useUnlockingPartialTransactionsContext = () => React.useContext(UnlockingPartialTransactionsContext);

export { UnlockingPartialTransactionsFormProvider, useUnlockingPartialTransactionsContext };
