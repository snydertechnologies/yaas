import classNames from 'classnames';
// @ts-nocheck
import React from 'react';

import { Dialog, DialogSuspense, T } from '@bigcapital/webapp/components';

import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';

import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { compose } from '@bigcapital/webapp/utils';

const PdfPreviewDialogContent = React.lazy(() => import('./CreditNotePdfPreviewDialogContent'));

/**
 * Credit note PDF previwe dialog.
 */
function CreditNotePdfPreviewDialog({ dialogName, payload = { creditNoteId: null }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={<T id={'credit_note_preview.dialog.title'} />}
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
export default compose(withDialogRedux())(CreditNotePdfPreviewDialog);
