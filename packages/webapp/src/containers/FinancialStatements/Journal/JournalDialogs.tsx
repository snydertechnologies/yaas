import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { JournalPdfDialog } from './dialogs/JournalPdfDialog';

export function JournalDialogs() {
  return (
    <>
      <JournalPdfDialog dialogName={DialogsName.JournalPdfPreview} />
    </>
  );
}
