import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';

const ReceiptMailDialogBody = React.lazy(() => import('./ReceiptMailDialogBody'));

/**
 * Receipt mail dialog.
 */
function ReceiptMailDialog({ dialogName, payload: { receiptId = null }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={'Receipt Mail'}
      isOpen={isOpen}
      canEscapeJeyClose={true}
      autoFocus={true}
      style={{ width: 600 }}
    >
      <DialogSuspense>
        <ReceiptMailDialogBody receiptId={receiptId} />
      </DialogSuspense>
    </Dialog>
  );
}
export default compose(withDialogRedux())(ReceiptMailDialog);
