import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';

const InvoiceMailDialogBody = React.lazy(() => import('./InvoiceMailDialogBody'));

/**
 * Invoice mail dialog.
 */
function InvoiceMailDialog({ dialogName, payload: { invoiceId = null }, isOpen }) {
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
        <InvoiceMailDialogBody invoiceId={invoiceId} />
      </DialogSuspense>
    </Dialog>
  );
}
export default compose(withDialogRedux())(InvoiceMailDialog);
