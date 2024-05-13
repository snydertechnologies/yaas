import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React, { lazy } from 'react';

const AccountDialogContent = lazy(() => import('./AccountDialogContent'));

/**
 * Account form dialog.
 */
function AccountFormDialog({ dialogName, payload = { action: '', id: null }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={payload.action === 'edit' ? <T id={'edit_account'} /> : <T id={'new_account'} />}
      className={'dialog--account-form'}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
    >
      <DialogSuspense>
        <AccountDialogContent dialogName={dialogName} payload={payload} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(AccountFormDialog);
