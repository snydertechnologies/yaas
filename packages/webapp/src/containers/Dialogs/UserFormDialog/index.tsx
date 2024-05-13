import { Dialog, DialogSuspense, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React, { lazy } from 'react';

const UserFormDialogContent = lazy(() => import('./UserFormDialogContent'));

function UserFormDialog({ dialogName, payload = { action: '', userId: null }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={<T id={'edit_user'} />}
      className={'dialog--user-form'}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
    >
      <DialogSuspense>
        <UserFormDialogContent dialogName={dialogName} userId={payload.userId} action={payload.action} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(UserFormDialog);
