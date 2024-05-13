import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';

const NotifyReceiptViaSMSDialogContent = React.lazy(() => import('./NotifyReceiptViaSMSDialogContent'));

function NotifyReceiptViaSMSDialog({ dialogName, payload: { receiptId }, isOpen }) {
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
        <NotifyReceiptViaSMSDialogContent dialogName={dialogName} receipt={receiptId} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(NotifyReceiptViaSMSDialog);
