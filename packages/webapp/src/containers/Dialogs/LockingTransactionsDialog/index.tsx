import { Dialog, DialogSuspense, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';

const LockingTransactionsDialogContent = React.lazy(() => import('./LockingTransactionsDialogContent'));

/**
 * Locking Transactions dialog
 */
function LockingTransactionsDialog({ dialogName, payload: { module, isEnabled }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      autoFocus={true}
      title={<T id={'locking_transactions.dialog.label'} />}
      canEscapeKeyClose={true}
      isOpen={isOpen}
      className={'dialog--transaction--locking'}
    >
      <DialogSuspense>
        <LockingTransactionsDialogContent moduleName={module} dialogName={dialogName} isEnabled={isEnabled} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(LockingTransactionsDialog);
