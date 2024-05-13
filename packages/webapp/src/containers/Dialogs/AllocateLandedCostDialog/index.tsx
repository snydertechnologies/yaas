import { Dialog, DialogSuspense, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React, { lazy } from 'react';

const AllocateLandedCostDialogContent = lazy(() => import('./AllocateLandedCostDialogContent'));

/**
 * Allocate landed cost dialog.
 */
function AllocateLandedCostDialog({ dialogName, payload = { billId: null }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={<T id={'allocate_landed_coast'} />}
      canEscapeKeyClose={true}
      isOpen={isOpen}
      className="dialog--allocate-landed-cost-form"
    >
      <DialogSuspense>
        <AllocateLandedCostDialogContent billId={payload.billId} dialogName={dialogName} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(AllocateLandedCostDialog);
