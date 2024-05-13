import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { SalesByItemsPdfDialog } from './dialogs/SalesByItemsPdfDialog';

export function SalesByItemsDialogs() {
  return (
    <>
      <SalesByItemsPdfDialog dialogName={DialogsName.SalesByItemsPdfPreview} />
    </>
  );
}
