import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { InventoryValuationPdfDialog } from './dialogs/InventoryValuationPdfDialog';

export function InventoryValuationDialogs() {
  return (
    <>
      <InventoryValuationPdfDialog dialogName={DialogsName.InventoryValuationPdfPreview} />
    </>
  );
}
