import { Dialog, DialogSuspense, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
// @ts-nocheck
import React from 'react';

import { compose } from '@bigcapital/webapp/utils';

const WarehouseActivateDialogContent = React.lazy(() => import('./WarehouseActivateDialogContent'));

/**
 * Warehouse activate dialog.
 */
function WarehouseActivateDialog({ dialogName, payload: {}, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={<T id={'warehouse_activate.dialog.label'} />}
      isOpen={isOpen}
      canEscapeJeyClose={true}
      autoFocus={true}
      className={'dialog--warehouse-activate'}
    >
      <DialogSuspense>
        <WarehouseActivateDialogContent dialogName={dialogName} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(WarehouseActivateDialog);
