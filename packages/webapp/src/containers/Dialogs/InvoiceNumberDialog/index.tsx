import { Dialog, DialogSuspense, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose, saveInvoke } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React, { lazy } from 'react';

const InvoiceNumberDialogContent = lazy(() => import('./InvoiceNumberDialogContent'));

/**
 * Invoice number dialog.
 */
function InvoiceNumberDialog({ dialogName, payload: { initialFormValues }, isOpen, onConfirm }) {
  const handleConfirm = (values) => {
    saveInvoke(onConfirm, values);
  };

  return (
    <Dialog
      title={<T id={'invoice_number_settings'} />}
      name={dialogName}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
    >
      <DialogSuspense>
        <InvoiceNumberDialogContent initialValues={{ ...initialFormValues }} onConfirm={handleConfirm} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(InvoiceNumberDialog);
