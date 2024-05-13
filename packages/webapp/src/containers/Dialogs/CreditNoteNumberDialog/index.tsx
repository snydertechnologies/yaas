import { Dialog, DialogSuspense, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose, saveInvoke } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';

const CreditNoteNumberDialogContent = React.lazy(() => import('./CreditNoteNumberDialogContent'));

/**
 * Credit note number dialog.
 */
function CreditNoteNumberDialog({ dialogName, payload: { initialFormValues }, isOpen, onConfirm }) {
  const handleConfirm = (values) => {
    saveInvoke(onConfirm, values);
  };

  return (
    <Dialog
      title={<T id={'credit_note_number_settings'} />}
      name={dialogName}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
    >
      <DialogSuspense>
        <CreditNoteNumberDialogContent initialValues={{ ...initialFormValues }} onConfirm={handleConfirm} />
      </DialogSuspense>
    </Dialog>
  );
}
export default compose(withDialogRedux())(CreditNoteNumberDialog);
