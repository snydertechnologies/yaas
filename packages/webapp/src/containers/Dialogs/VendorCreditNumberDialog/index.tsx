import { Dialog, DialogSuspense, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose, saveInvoke } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';

const VendorCreditNumberDialogContent = React.lazy(() => import('./VendorCreditNumberDialogContent'));

/**
 * Vendor Credit number dialog.
 */
function VendorCreditNumberDialog({ dialogName, payload: { initialFormValues }, isOpen, onConfirm }) {
  const handleConfirm = (values) => {
    saveInvoke(onConfirm, values);
  };

  return (
    <Dialog
      title={<T id={'vendor_credit_number_settings'} />}
      name={dialogName}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
    >
      <DialogSuspense>
        <VendorCreditNumberDialogContent initialValues={{ ...initialFormValues }} onConfirm={handleConfirm} />
      </DialogSuspense>
    </Dialog>
  );
}
export default compose(withDialogRedux())(VendorCreditNumberDialog);
