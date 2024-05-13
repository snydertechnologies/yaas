import { Dialog, DialogSuspense, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose, saveInvoke } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';

const WarehouseTransferNumberDialogContent = React.lazy(() => import('./WarehouseTransferNumberDialogContent'));

/**
 * Warehouse transfer number dialog.
 */
function WarehouseTransferNumberDilaog({ dialogName, payload: { initialFormValues }, isOpen, onConfirm }) {
  const handleConfirm = (values) => {
    saveInvoke(onConfirm, values);
  };
  return (
    <Dialog
      title={<T id={'warehouse_transfer_no_settings'} />}
      name={dialogName}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
    >
      <DialogSuspense>
        <WarehouseTransferNumberDialogContent initialValues={{ ...initialFormValues }} onConfirm={handleConfirm} />
      </DialogSuspense>
    </Dialog>
  );
}
export default compose(withDialogRedux())(WarehouseTransferNumberDilaog);
