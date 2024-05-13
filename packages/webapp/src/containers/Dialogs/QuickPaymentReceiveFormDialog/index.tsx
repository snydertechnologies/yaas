// @ts-nocheck
import React, { lazy } from 'react';

import { Dialog, DialogSuspense, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';

const QuickPaymentReceiveFormDialogContent = lazy(() => import('./QuickPaymentReceiveFormDialogContent'));

/**
 * Quick payment receive form dialog.
 */
function QuickPaymentReceiveFormDialog({ dialogName, payload = { invoiceId: null }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={<T id={'quick_receive_payment'} />}
      isOpen={isOpen}
      canEscapeJeyClose={true}
      autoFocus={true}
      className={'dialog--quick-payment-receive'}
    >
      <DialogSuspense>
        <QuickPaymentReceiveFormDialogContent dialogName={dialogName} invoice={payload.invoiceId} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(QuickPaymentReceiveFormDialog);
