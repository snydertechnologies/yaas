import { DialogContent } from '@bigcapital/webapp/components';
import { useSettingsInvoices } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React, { createContext, useContext } from 'react';

const InvoiceNumberDialogContext = createContext();

/**
 * Invoice number dialog provider.
 */
function InvoiceNumberDialogProvider({ query, ...props }) {
  const { isLoading: isSettingsLoading } = useSettingsInvoices();

  // Provider payload.
  const provider = {
    isSettingsLoading,
  };

  return (
    <DialogContent isLoading={isSettingsLoading}>
      <InvoiceNumberDialogContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useInvoiceNumberDialogContext = () => useContext(InvoiceNumberDialogContext);

export { InvoiceNumberDialogProvider, useInvoiceNumberDialogContext };
