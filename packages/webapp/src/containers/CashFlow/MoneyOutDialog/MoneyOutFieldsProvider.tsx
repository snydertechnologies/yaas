import { DialogContent } from '@bigcapital/webapp/components';
import { useAccount } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';
import { useMoneyOutDialogContext } from './MoneyOutDialogProvider';

const MoneyOutFieldsContext = React.createContext();

/**
 * Money out fields dialog provider.
 */
function MoneyOutFieldsProvider({ ...props }) {
  const { accountId } = useMoneyOutDialogContext();

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
      <MoneyOutFieldsContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useMoneyOutFieldsContext = () => React.useContext(MoneyOutFieldsContext);

export { MoneyOutFieldsProvider, useMoneyOutFieldsContext };
