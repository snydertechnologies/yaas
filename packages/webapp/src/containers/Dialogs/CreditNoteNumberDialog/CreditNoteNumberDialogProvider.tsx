import { DialogContent } from '@bigcapital/webapp/components';
import { useSettingsCreditNotes } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';

const CreditNoteNumberDialogContext = React.createContext();

/**
 *Credit Note number dialog provider
 */
function CreditNoteNumberDialogProvider({ query, ...props }) {
  const { isLoading: isSettingsLoading } = useSettingsCreditNotes();

  // Provider payload.
  const provider = {
    isSettingsLoading,
  };

  return (
    <DialogContent isLoading={isSettingsLoading}>
      <CreditNoteNumberDialogContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useCreditNoteNumberDialogContext = () => React.useContext(CreditNoteNumberDialogContext);

export { CreditNoteNumberDialogProvider, useCreditNoteNumberDialogContext };
