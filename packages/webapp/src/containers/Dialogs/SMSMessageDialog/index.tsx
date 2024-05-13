import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { compose } from '@bigcapital/webapp/utils';

const SMSMessageDialogContent = React.lazy(() => import('./SMSMessageDialogContent'));

/**
 * SMS Message dialog.
 */
function SMSMessageDialog({ dialogName, payload: { notificationkey }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={intl.get('sms_message.dialog.label')}
      isOpen={isOpen}
      canEscapeJeyClose={true}
      autoFocus={true}
      className={'dialog--sms-message'}
    >
      <DialogSuspense>
        <SMSMessageDialogContent dialogName={dialogName} notificationkey={notificationkey} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(SMSMessageDialog);
