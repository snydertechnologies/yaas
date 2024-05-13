import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
// @ts-nocheck
import * as R from 'ramda';
import InvoiceMailDialogContent, { InvoiceMailDialogContentProps } from './InvoiceMailDialogContent';

export interface InvoiceMailDialogBodyProps extends InvoiceMailDialogContentProps {}

function InvoiceMailDialogBodyRoot({
  invoiceId,
  onCancelClick,
  onFormSubmit,

  // #withDialogActions
  closeDialog,
}: InvoiceMailDialogBodyProps) {
  const handleCancelClick = () => {
    closeDialog(DialogsName.InvoiceMail);
  };
  const handleSubmitClick = () => {
    closeDialog(DialogsName.InvoiceMail);
  };

  return (
    <InvoiceMailDialogContent
      invoiceId={invoiceId}
      onCancelClick={handleCancelClick}
      onFormSubmit={handleSubmitClick}
    />
  );
}

export default R.compose(withDialogActions)(InvoiceMailDialogBodyRoot);
