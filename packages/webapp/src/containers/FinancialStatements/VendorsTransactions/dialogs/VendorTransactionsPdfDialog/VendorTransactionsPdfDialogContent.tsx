import { DialogContent, PdfDocumentPreview, FormattedMessage as T } from '@bigcapital/webapp/components';
import { useTransactionsByVendorsPdf } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import { AnchorButton } from '@blueprintjs/core';
import { useVendorsTransactionsContext } from '../../VendorsTransactionsProvider';

export default function VendorTransactionsPdfDialogContent() {
  const { httpQuery } = useVendorsTransactionsContext();
  const { isLoading, pdfUrl } = useTransactionsByVendorsPdf(httpQuery);

  return (
    <DialogContent>
      <div className="dialog__header-actions">
        <AnchorButton href={pdfUrl} target={'__blank'} minimal={true} outlined={true}>
          <T id={'pdf_preview.preview.button'} />
        </AnchorButton>

        <AnchorButton href={pdfUrl} download={'invoice.pdf'} minimal={true} outlined={true}>
          <T id={'pdf_preview.download.button'} />
        </AnchorButton>
      </div>

      <PdfDocumentPreview height={760} width={1000} isLoading={isLoading} url={pdfUrl} />
    </DialogContent>
  );
}
