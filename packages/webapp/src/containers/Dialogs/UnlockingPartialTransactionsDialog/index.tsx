import { Dialog, DialogSuspense, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';

const UnlockingPartialTransactionsDialogContent = React.lazy(
  () => import('./UnlockingPartialTransactionsDialogContent'),
);

/**
 * UncLocking Partial transactions dialog.
 */
function UnLockingPartialTransactionsDilaog({ isOpen, dialogName, payload: { module } }) {
  return (
    <Dialog
      name={dialogName}
      autoFocus={true}
      title={<T id={'unlocking_partial_transactions.dialog.label'} />}
      canEscapeKeyClose={true}
      isOpen={isOpen}
      className={'dialog--transaction--locking'}
    >
      <DialogSuspense>
        <UnlockingPartialTransactionsDialogContent moduleName={module} dialogName={dialogName} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(UnLockingPartialTransactionsDilaog);
