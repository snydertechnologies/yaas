import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
// @ts-nocheck
import * as R from 'ramda';
import { useHistory } from 'react-router-dom';
import InvoiceMailDialogContent from '../../../InvoiceMailDialog/InvoiceMailDialogContent';

interface InvoiceFormDeliverDialogContent {
  invoiceId: number;
}

function InvoiceFormDeliverDialogContentRoot({
  invoiceId,

  // #withDialogActions
  closeDialog,
}: InvoiceFormDeliverDialogContent) {
  const history = useHistory();

  const handleSubmit = () => {
    history.push('/invoices');
    closeDialog(DialogsName.InvoiceFormMailDeliver);
  };
  const handleCancel = () => {
    history.push('/invoices');
    closeDialog(DialogsName.InvoiceFormMailDeliver);
  };

  return <InvoiceMailDialogContent invoiceId={invoiceId} onFormSubmit={handleSubmit} onCancelClick={handleCancel} />;
}

export default R.compose(withDialogActions)(InvoiceFormDeliverDialogContentRoot);
