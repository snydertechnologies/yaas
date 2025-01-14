import { DialogContent } from '@bigcapital/webapp/components';
import { useCreateReconcileCreditNote, useCreditNote, useReconcileCreditNote } from '@bigcapital/webapp/hooks/query';
import { isEmpty } from 'lodash';
// @ts-nocheck
import React from 'react';

const ReconcileCreditNoteDialogContext = React.createContext();

/**
 * Reconcile credit note provider.
 */
function ReconcileCreditNoteFormProvider({ creditNoteId, dialogName, ...props }) {
  // Handle fetch reconcile credit note details.
  const { isLoading: isReconcileCreditLoading, data: reconcileCreditNotes } = useReconcileCreditNote(creditNoteId, {
    enabled: !!creditNoteId,
  });

  // Handle fetch vendor credit details.
  const { data: creditNote, isLoading: isCreditNoteLoading } = useCreditNote(creditNoteId, {
    enabled: !!creditNoteId,
  });

  // Create reconcile credit note mutations.
  const { mutateAsync: createReconcileCreditNoteMutate } = useCreateReconcileCreditNote();

  // Detarmines the datatable empty status.
  const isEmptyStatus = isEmpty(reconcileCreditNotes);

  // provider payload.
  const provider = {
    dialogName,
    reconcileCreditNotes,
    createReconcileCreditNoteMutate,
    isEmptyStatus,
    creditNote,
    creditNoteId,
  };

  return (
    <DialogContent isLoading={isReconcileCreditLoading || isCreditNoteLoading} name={'reconcile-credit-note'}>
      <ReconcileCreditNoteDialogContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useReconcileCreditNoteContext = () => React.useContext(ReconcileCreditNoteDialogContext);

export { ReconcileCreditNoteFormProvider, useReconcileCreditNoteContext };
