import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';

const InvoiceFormMailDeliverDialogContent = React.lazy(() => import('./InvoiceFormMailDeliverDialogContent'));

/**
 * Invoice mail dialog.
 */
function InvoiceFormMailDeliverDialog({ dialogName, payload: { invoiceId = null }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={'Invoice Mail'}
      isOpen={isOpen}
      canEscapeJeyClose={false}
      isCloseButtonShown={false}
      autoFocus={true}
      style={{ width: 600 }}
    >
      <DialogSuspense>
        <InvoiceFormMailDeliverDialogContent dialogName={dialogName} invoiceId={invoiceId} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(InvoiceFormMailDeliverDialog);
