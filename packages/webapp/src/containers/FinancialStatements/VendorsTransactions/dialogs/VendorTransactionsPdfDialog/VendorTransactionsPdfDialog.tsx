import classNames from 'classnames';
// @ts-nocheck
import React, { lazy } from 'react';

import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { compose } from '@bigcapital/webapp/utils';

// Lazy loading the content.
const InventoryValuationPdfDialogContent = lazy(() => import('./VendorTransactionsPdfDialogContent'));

/**
 * Balance sheet pdf preview dialog.
 * @returns {React.ReactNode}
 */
function VendorTransactionsPdfDialogRoot({ dialogName, payload, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={'Vendor Transactions Print Preview'}
      className={classNames(CLASSES.DIALOG_PDF_PREVIEW)}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
      style={{ width: '1000px' }}
    >
      <DialogSuspense>
        <InventoryValuationPdfDialogContent dialogName={dialogName} />
      </DialogSuspense>
    </Dialog>
  );
}

export const VendorTransactionsPdfDialog = compose(withDialogRedux())(VendorTransactionsPdfDialogRoot);
