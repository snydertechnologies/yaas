import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';

const EstimateMailDialogBody = React.lazy(() => import('./EstimateMailDialogBody'));

/**
 * Estimate mail dialog.
 */
function EstimateMailDialog({ dialogName, payload: { estimateId = null }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={'Estimate Mail'}
      isOpen={isOpen}
      canEscapeJeyClose={true}
      autoFocus={true}
      style={{ width: 600 }}
    >
      <DialogSuspense>
        <EstimateMailDialogBody estimateId={estimateId} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(EstimateMailDialog);
