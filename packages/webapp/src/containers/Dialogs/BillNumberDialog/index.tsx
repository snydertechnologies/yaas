import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React, { lazy } from 'react';

const BillNumberDialogContent = lazy(() => import('./BillNumberDialogContent'));

function BillNumberDialog({ dialogName, payload = { id: null }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={<T id={'bill_number_settings'} />}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
      className={'dialog--journal-number-settings'}
    >
      <DialogSuspense>
        <BillNumberDialogContent billNumberId={payload.id} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(BillNumberDialog);
