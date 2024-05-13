import { Dialog, DialogSuspense, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose, saveInvoke } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React, { lazy } from 'react';

const PaymentReceiveNumbereDialogContent = lazy(() => import('./PaymentReceiveNumberDialogContent'));

/**
 * Payment receive number dialog.
 */
function PaymentReceiveNumberDialog({ dialogName, payload: { initialFormValues }, isOpen, onConfirm }) {
  return (
    <Dialog
      title={<T id={'payment_number_settings'} />}
      name={dialogName}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
    >
      <DialogSuspense>
        <PaymentReceiveNumbereDialogContent
          initialValues={initialFormValues}
          onConfirm={(values) => saveInvoke(onConfirm, values)}
        />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(PaymentReceiveNumberDialog);
