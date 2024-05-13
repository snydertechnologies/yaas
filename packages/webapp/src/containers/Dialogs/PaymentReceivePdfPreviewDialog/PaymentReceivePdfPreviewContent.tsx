import { AnchorButton } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import { DialogContent, PdfDocumentPreview, T } from '@bigcapital/webapp/components';
import { usePdfPaymentReceive } from '@bigcapital/webapp/hooks/query';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';

function PaymentReceivePdfPreviewDialogContent({ subscriptionForm: { paymentReceiveId } }) {
  const { isLoading, pdfUrl } = usePdfPaymentReceive(paymentReceiveId);

  return (
    <DialogContent>
      <div className="dialog__header-actions">
        <AnchorButton href={pdfUrl} target={'__blank'} minimal={true} outlined={true}>
          <T id={'pdf_preview.preview.button'} />
        </AnchorButton>

        <AnchorButton href={pdfUrl} download={'payment.pdf'} minimal={true} outlined={true}>
          <T id={'pdf_preview.download.button'} />
        </AnchorButton>
      </div>

      <PdfDocumentPreview height={760} width={1000} isLoading={isLoading} url={pdfUrl} />
    </DialogContent>
  );
}

export default compose(withDialogActions)(PaymentReceivePdfPreviewDialogContent);
