// @ts-nocheck
import React from 'react';

import { Dialog, DialogSuspense, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';

const NotifyEstimateViaSMSDialogContent = React.lazy(() => import('./NotifyEstimateViaSMSDialogContent'));

function NotifyEstimateViaSMSDialog({ dialogName, payload: { estimateId }, isOpen }) {
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
        <NotifyEstimateViaSMSDialogContent dialogName={dialogName} estimate={estimateId} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(NotifyEstimateViaSMSDialog);
