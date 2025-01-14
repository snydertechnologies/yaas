import { Dialog, DialogSuspense, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React, { lazy } from 'react';

const UserFormDialogContent = lazy(() => import('./InviteUserDialogContent'));

// User form dialog.
function UserFormDialog({ dialogName, payload = { action: '', id: null }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={payload.action === 'edit' ? <T id={'edit_invite'} /> : <T id={'invite_user'} />}
      className={'dialog--invite-form'}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
    >
      <DialogSuspense>
        <UserFormDialogContent dialogName={dialogName} userId={payload.id} action={payload.action} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(
  // UserFormDialogConnect,
  withDialogRedux(),
)(UserFormDialog);
