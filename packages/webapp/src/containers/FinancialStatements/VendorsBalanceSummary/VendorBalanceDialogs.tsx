import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { VendorBalancePdfDialog } from './dialogs/VendorBalancePdfDialog';

export function VendorBalanceDialogs() {
  return (
    <>
      <VendorBalancePdfDialog dialogName={DialogsName.VendorBalancePdfPreview} />
    </>
  );
}
