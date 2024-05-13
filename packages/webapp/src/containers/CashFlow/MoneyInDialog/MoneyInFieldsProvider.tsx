import { DialogContent } from '@bigcapital/webapp/components';
import { useAccount } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';
import { useMoneyInDailogContext } from './MoneyInDialogProvider';

const MoneyInFieldsContext = React.createContext();

/**
 * Money in dialog provider.
 */
function MoneyInFieldsProvider({ ...props }) {
  const { accountId } = useMoneyInDailogContext();

  // Fetches the specific account details.
  const { data: account, isLoading: isAccountLoading } = useAccount(accountId, {
    enabled: !!accountId,
  });
  // Provider data.
  const provider = {
    account,
  };
  const isLoading = isAccountLoading;

  return (
    <DialogContent isLoading={isLoading}>
      <MoneyInFieldsContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useMoneyInFieldsContext = () => React.useContext(MoneyInFieldsContext);

export { MoneyInFieldsProvider, useMoneyInFieldsContext };
