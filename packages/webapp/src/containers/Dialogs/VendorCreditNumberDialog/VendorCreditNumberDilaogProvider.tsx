import { DialogContent } from '@bigcapital/webapp/components';
import { useSettingsVendorCredits } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';

const VendorCreditNumberDialogContext = React.createContext();

/**
 * Vendor credit number dialog provider
 */
function VendorCreditNumberDilaogProvider({ query, ...props }) {
  const { isLoading: isSettingsLoading } = useSettingsVendorCredits();

  // Provider payload.
  const provider = {
    isSettingsLoading,
  };

  return (
    <DialogContent isLoading={isSettingsLoading}>
      <VendorCreditNumberDialogContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useVendorCreditNumberDialogContext = () => React.useContext(VendorCreditNumberDialogContext);

export { VendorCreditNumberDilaogProvider, useVendorCreditNumberDialogContext };
