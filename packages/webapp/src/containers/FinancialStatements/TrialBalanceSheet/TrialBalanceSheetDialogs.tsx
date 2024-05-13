import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { TrialBalanceSheetPdfDialog } from './dialogs/TrialBalanceSheetPdfDialog';

export const TrialBalanceSheetDialogs = () => {
  return (
    <>
      <TrialBalanceSheetPdfDialog dialogName={DialogsName.TrialBalanceSheetPdfPreview} />
    </>
  );
};
