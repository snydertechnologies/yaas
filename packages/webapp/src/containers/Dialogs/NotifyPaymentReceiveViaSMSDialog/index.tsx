import { Dialog, DialogSuspense, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';

const NotifyPaymentReceiveViaSMSDialogContent = React.lazy(() => import('./NotifyPaymentReceiveViaSMSContent'));

function NotifyPaymentReciveViaSMSDialog({ dialogName, payload: { paymentReceiveId }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={<T id={'notify_via_sms.dialog.notify_via_sms'} />}
      isOpen={isOpen}
      canEscapeJeyClose={true}
      autoFocus={true}
      className={'dialog--notify-vis-sms'}
    >
      <DialogSuspense>
        <NotifyPaymentReceiveViaSMSDialogContent dialogName={dialogName} paymentReceive={paymentReceiveId} />
      </DialogSuspense>
    </Dialog>
  );
}
export default compose(withDialogRedux())(NotifyPaymentReciveViaSMSDialog);
