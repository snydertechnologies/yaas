import { Dialog, DialogSuspense, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React, { lazy } from 'react';

const QuickPaymentMadeFormDialogContent = lazy(() => import('./QuickPaymentMadeFormDialogContent'));

/**
 * Quick payment made form dialog.
 */
function QuickPaymentMadeFormDialog({ dialogName, payload = { billId: null }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={<T id={'quick_made_payment'} />}
      isOpen={isOpen}
      canEscapeJeyClose={true}
      autoFocus={true}
      className={'dialog--quick-payment-receive'}
    >
      <DialogSuspense>
        <QuickPaymentMadeFormDialogContent bill={payload.billId} dialogName={dialogName} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(QuickPaymentMadeFormDialog);
