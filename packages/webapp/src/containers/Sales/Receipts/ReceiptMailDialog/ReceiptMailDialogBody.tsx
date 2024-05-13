import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
// @ts-nocheck
import * as R from 'ramda';
import ReceiptMailDialogContent, { ReceiptMailDialogContentProps } from './ReceiptMailDialogContent';

interface ReceiptMailDialogBodyProps extends ReceiptMailDialogContentProps {}

function ReceiptMailDialogBodyRoot({
  receiptId,

  // #withDialogActions
  closeDialog,
}: ReceiptMailDialogBodyProps) {
  const handleCancelClick = () => {
    closeDialog(DialogsName.ReceiptMail);
  };
  const handleSubmitClick = () => {
    closeDialog(DialogsName.ReceiptMail);
  };

  return (
    <ReceiptMailDialogContent
      receiptId={receiptId}
      onFormSubmit={handleSubmitClick}
      onCancelClick={handleCancelClick}
    />
  );
}

export default R.compose(withDialogActions)(ReceiptMailDialogBodyRoot);
