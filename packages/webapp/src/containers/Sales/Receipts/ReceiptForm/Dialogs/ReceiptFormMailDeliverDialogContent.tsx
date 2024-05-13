import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
// @ts-nocheck
import * as R from 'ramda';
import { useHistory } from 'react-router-dom';
import ReceiptMailDialogContent from '../../ReceiptMailDialog/ReceiptMailDialogContent';

interface ReceiptFormDeliverDialogContent {
  receiptId: number;
}

function ReceiptFormDeliverDialogContentRoot({
  receiptId,

  // #withDialogActions
  closeDialog,
}: ReceiptFormDeliverDialogContent) {
  const history = useHistory();

  const handleSubmit = () => {
    history.push('/receipts');
    closeDialog(DialogsName.ReceiptFormMailDeliver);
  };
  const handleCancel = () => {
    history.push('/receipts');
    closeDialog(DialogsName.ReceiptFormMailDeliver);
  };

  return <ReceiptMailDialogContent receiptId={receiptId} onFormSubmit={handleSubmit} onCancelClick={handleCancel} />;
}

export default R.compose(withDialogActions)(ReceiptFormDeliverDialogContentRoot);
