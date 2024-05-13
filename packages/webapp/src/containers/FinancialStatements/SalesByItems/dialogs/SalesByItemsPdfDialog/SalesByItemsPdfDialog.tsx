import classNames from 'classnames';
// @ts-nocheck
import React, { lazy } from 'react';

import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { compose } from '@bigcapital/webapp/utils';

// Lazy loading the content.
const SalesByItemsPdfDialogContent = lazy(() => import('./SalesByItemsPdfDialogContent'));

/**
 * Sales by items sheet pdf preview dialog.
 * @returns {React.ReactNode}
 */
function SalesByItemsPdfDialogRoot({ dialogName, payload, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={'Sales By Items Print Preview'}
      className={classNames(CLASSES.DIALOG_PDF_PREVIEW)}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
      style={{ width: '1000px' }}
    >
      <DialogSuspense>
        <SalesByItemsPdfDialogContent dialogName={dialogName} />
      </DialogSuspense>
    </Dialog>
  );
}

export const SalesByItemsPdfDialog = compose(withDialogRedux())(SalesByItemsPdfDialogRoot);
