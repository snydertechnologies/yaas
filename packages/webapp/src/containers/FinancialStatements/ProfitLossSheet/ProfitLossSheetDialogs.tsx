import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { ProfitLossSheetPdfDialog } from './ProfitLossSheetPdfDialog';

export function ProfitLossSheetDialogs() {
  return (
    <>
      <ProfitLossSheetPdfDialog dialogName={DialogsName.ProfitLossSheetPdfPreview} />
    </>
  );
}
