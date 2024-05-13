import classNames from 'classnames';
// @ts-nocheck
import React, { lazy } from 'react';

import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { compose } from '@bigcapital/webapp/utils';

// Lazy loading the content.
const VendorBalancePdfDialogContent = lazy(() => import('./VendorBalancePdfDialogContent'));

/**
 * Vendor balance sheet pdf preview dialog.
 * @returns {React.ReactNode}
 */
function VendorBalancePdfDialogRoot({ dialogName, payload, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={'Vendor Balance Summary Print Preview'}
      className={classNames(CLASSES.DIALOG_PDF_PREVIEW)}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
      style={{ width: '1000px' }}
    >
      <DialogSuspense>
        <VendorBalancePdfDialogContent />
      </DialogSuspense>
    </Dialog>
  );
}

export const VendorBalancePdfDialog = compose(withDialogRedux())(VendorBalancePdfDialogRoot);
