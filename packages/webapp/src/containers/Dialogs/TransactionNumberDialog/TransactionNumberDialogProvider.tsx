import { DialogContent } from '@bigcapital/webapp/components';
import { useSettingCashFlow } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';

const TransactionNumberDialogContext = React.createContext();

/**
 * Transaction number dialog provider.
 */
function TransactionNumberDialogProvider({ query, ...props }) {
  const { isLoading: isSettingsLoading } = useSettingCashFlow();

  // Provider payload.
  const provider = { isSettingsLoading };

  return (
    <DialogContent isLoading={isSettingsLoading}>
      <TransactionNumberDialogContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useTransactionNumberDialogContext = () => React.useContext(TransactionNumberDialogContext);

export { TransactionNumberDialogProvider, useTransactionNumberDialogContext };
