import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { VendorTransactionsPdfDialog } from './dialogs/VendorTransactionsPdfDialog';

export function VendorTransactionsDialogs() {
  return (
    <>
      <VendorTransactionsPdfDialog dialogName={DialogsName.VendorTransactionsPdfPreview} />
    </>
  );
}
