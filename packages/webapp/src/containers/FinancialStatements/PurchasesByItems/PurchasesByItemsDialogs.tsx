import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { PurchasesByItemsPdfDialog } from './dialogs/PurchasesByItemsDialog';

export function PurchasesByItemsDialogs() {
  return (
    <>
      <PurchasesByItemsPdfDialog dialogName={DialogsName.PurchasesByItemsPdfPreview} />
    </>
  );
}
