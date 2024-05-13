import { Dialog, DialogSuspense, FormattedMessage as T } from '@bigcapital/webapp/components';
// @ts-nocheck
import React, { lazy } from 'react';

import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';

import { compose } from '@bigcapital/webapp/utils';

// Lazy loading the content.
const PaymentViaLicenseDialogContent = lazy(() => import('./PaymentViaVoucherDialogContent'));

/**
 * Payment via license dialog.
 */
function PaymentViaLicenseDialog({ dialogName, payload, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={<T id={'payment_via_voucher'} />}
      className={'dialog--payment-via-voucher'}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
    >
      <DialogSuspense>
        <PaymentViaLicenseDialogContent dialogName={dialogName} subscriptionForm={payload} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(PaymentViaLicenseDialog);
