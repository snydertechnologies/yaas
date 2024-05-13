import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { InventoryItemDetailsPdfDialog } from './dialogs/InventoryItemDetailsPdfDialog';

export function InventoryItemDetailsDialogs() {
  return (
    <>
      <InventoryItemDetailsPdfDialog dialogName={DialogsName.InventoryItemDetailsPdfPreview} />
    </>
  );
}
