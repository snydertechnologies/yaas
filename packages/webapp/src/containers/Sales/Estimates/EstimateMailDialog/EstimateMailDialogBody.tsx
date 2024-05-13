import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
// @ts-nocheck
import * as R from 'ramda';
import EstimateMailDialogContent from './EstimateMailDialogContent';

interface EstimateMailDialogBodyProps {
  estimateId: number;
}

function EstimateMailDialogBodyRoot({
  estimateId,

  // #withDialogActions
  closeDialog,
}: EstimateMailDialogBodyProps) {
  const handleSubmit = () => {
    closeDialog(DialogsName.EstimateMail);
  };
  const handleCancelClick = () => {
    closeDialog(DialogsName.EstimateMail);
  };

  return (
    <EstimateMailDialogContent estimateId={estimateId} onFormSubmit={handleSubmit} onCancelClick={handleCancelClick} />
  );
}

export default R.compose(withDialogActions)(EstimateMailDialogBodyRoot);
