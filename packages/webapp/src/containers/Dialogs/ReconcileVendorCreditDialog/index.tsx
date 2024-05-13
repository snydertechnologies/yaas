import { Dialog, DialogSuspense, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';

const ReconcileVendorCreditDialogContent = React.lazy(() => import('./ReconcileVendorCreditDialogContent'));

/**
 * Reconcile vendor credit dialog.
 */
function ReconcileVendorCreditDialog({ dialogName, payload: { vendorCreditId }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={<T id={'reconcile_vendor_credit.dialog.label'} />}
      canEscapeKeyClose={true}
      isOpen={isOpen}
      className="dialog--reconcile-vendor-credit-form"
    >
      <DialogSuspense>
        <ReconcileVendorCreditDialogContent vendorCreditId={vendorCreditId} dialogName={dialogName} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(ReconcileVendorCreditDialog);
