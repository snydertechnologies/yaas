import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { CashflowSheetPdfDialog } from './CashflowSheetPdfDialog';

export function CashflowSheetDialogs() {
  return (
    <>
      <CashflowSheetPdfDialog dialogName={DialogsName.CashflowSheetPdfPreview} />
    </>
  );
}
