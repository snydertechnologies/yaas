import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
// @ts-nocheck
import * as R from 'ramda';
import { useHistory } from 'react-router-dom';
import EstimateMailDialogContent from '../../EstimateMailDialog/EstimateMailDialogContent';

interface EstimateFormDeliverDialogContent {
  estimateId: number;
}

function EstimateFormDeliverDialogContentRoot({
  estimateId,

  // #withDialogActions
  closeDialog,
}: EstimateFormDeliverDialogContent) {
  const history = useHistory();

  const handleSubmit = () => {
    closeDialog(DialogsName.EstimateFormMailDeliver);
    history.push('/estimates');
  };
  const handleCancel = () => {
    closeDialog(DialogsName.EstimateFormMailDeliver);
    history.push('/estimates');
  };

  return <EstimateMailDialogContent estimateId={estimateId} onFormSubmit={handleSubmit} onCancelClick={handleCancel} />;
}

export default R.compose(withDialogActions)(EstimateFormDeliverDialogContentRoot);
