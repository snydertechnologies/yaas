import classNames from 'classnames';
// @ts-nocheck
import React, { lazy } from 'react';

import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';

import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';

import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { compose } from '@bigcapital/webapp/utils';

// Lazy loading the content.
const CashflowSheetPdfDialogContent = lazy(() => import('./CashflowSheetPdfDialogContent'));

/**
 * Cashflow sheet pdf preview dialog.
 * @returns {React.ReactNode}
 */
function CashflowSheetPdfDialogRoot({ dialogName, payload, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={'Cashflow Sheet Print Preview'}
      className={classNames(CLASSES.DIALOG_PDF_PREVIEW)}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
      style={{ width: '1000px' }}
    >
      <DialogSuspense>
        <CashflowSheetPdfDialogContent />
      </DialogSuspense>
    </Dialog>
  );
}

export const CashflowSheetPdfDialog = compose(withDialogRedux())(CashflowSheetPdfDialogRoot);
