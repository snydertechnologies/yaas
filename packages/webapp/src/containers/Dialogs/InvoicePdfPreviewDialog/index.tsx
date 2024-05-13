import classNames from 'classnames';
// @ts-nocheck
import React, { lazy } from 'react';

import { Dialog, DialogSuspense, T } from '@bigcapital/webapp/components';

import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';

import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { compose } from '@bigcapital/webapp/utils';

// Lazy loading the content.
const PdfPreviewDialogContent = lazy(() => import('./InvoicePdfPreviewDialogContent'));

/**
 * Invoice PDF preview dialog.
 */
function InvoicePdfPreviewDialog({ dialogName, payload, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={<T id={'invoice_preview.dialog.title'} />}
      className={classNames(CLASSES.DIALOG_PDF_PREVIEW)}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
      style={{ width: '1000px' }}
    >
      <DialogSuspense>
        <PdfPreviewDialogContent dialogName={dialogName} subscriptionForm={payload} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(InvoicePdfPreviewDialog);
