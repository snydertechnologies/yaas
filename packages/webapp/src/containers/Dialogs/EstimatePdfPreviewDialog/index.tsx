import classNames from 'classnames';
// @ts-nocheck
import React from 'react';

import { Dialog, DialogSuspense, T } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';

import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';

import { compose } from '@bigcapital/webapp/utils';

// Lazy loading the content.
const PdfPreviewDialogContent = React.lazy(() => import('./EstimatePdfPreviewDialogContent'));

/**
 * Estimate PDF preview dialog.
 */
function EstimatePdfPreviewDialog({ dialogName, payload = { estimateId: null }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={<T id={'estimate_preview.dialog.title'} />}
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

export default compose(withDialogRedux())(EstimatePdfPreviewDialog);
