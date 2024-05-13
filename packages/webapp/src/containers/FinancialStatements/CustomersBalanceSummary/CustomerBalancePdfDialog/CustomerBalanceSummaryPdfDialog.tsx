import classNames from 'classnames';
// @ts-nocheck
import React, { lazy } from 'react';

import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';

import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';

import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { compose } from '@bigcapital/webapp/utils';

// Lazy loading the content.
const CustomerBalanceSummaryPdfDialogContent = lazy(() => import('./CustomerBalanceSummaryPdfDialogContent'));

/**
 * Cashflow sheet pdf preview dialog.
 * @returns {React.ReactNode}
 */
function CashflowSheetPdfDialogRoot({ dialogName, payload, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={'Customer Balance Summary Print Preview'}
      className={classNames(CLASSES.DIALOG_PDF_PREVIEW)}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
      style={{ width: '1000px' }}
    >
      <DialogSuspense>
        <CustomerBalanceSummaryPdfDialogContent />
      </DialogSuspense>
    </Dialog>
  );
}

export const CustomerBalanceSummaryPdfDialog = compose(withDialogRedux())(CashflowSheetPdfDialogRoot);
