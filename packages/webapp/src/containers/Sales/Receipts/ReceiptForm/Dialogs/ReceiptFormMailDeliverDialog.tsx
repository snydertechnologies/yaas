import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';

const ReceiptFormMailDeliverDialogContent = React.lazy(() => import('./ReceiptFormMailDeliverDialogContent'));

/**
 * Receipt mail dialog.
 */
function ReceiptFormMailDeliverDialog({ dialogName, payload: { receiptId = null }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={'Receipt Mail'}
      isOpen={isOpen}
      canEscapeJeyClose={false}
      isCloseButtonShown={false}
      autoFocus={true}
      style={{ width: 600 }}
    >
      <DialogSuspense>
        <ReceiptFormMailDeliverDialogContent dialogName={dialogName} receiptId={receiptId} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(ReceiptFormMailDeliverDialog);
