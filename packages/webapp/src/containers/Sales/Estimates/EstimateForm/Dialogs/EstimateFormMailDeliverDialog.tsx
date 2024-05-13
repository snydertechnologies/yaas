import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React from 'react';

const EstimateFormMailDeliverDialogContent = React.lazy(() => import('./EstimateFormMailDeliverDialogContent'));

/**
 * Estimate mail dialog.
 */
function EstimateFormMailDeliverDialog({ dialogName, payload: { estimateId = null }, isOpen }) {
  return (
    <Dialog
      name={dialogName}
      title={'Estimate Mail'}
      isOpen={isOpen}
      canEscapeJeyClose={false}
      isCloseButtonShown={false}
      autoFocus={true}
      style={{ width: 600 }}
    >
      <DialogSuspense>
        <EstimateFormMailDeliverDialogContent dialogName={dialogName} estimateId={estimateId} />
      </DialogSuspense>
    </Dialog>
  );
}

export default compose(withDialogRedux())(EstimateFormMailDeliverDialog);
