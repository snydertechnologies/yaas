import { Dialog, DialogSuspense } from '@bigcapital/webapp/components';
import withDialogRedux from '@bigcapital/webapp/components/DialogReduxConnect';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React, { lazy } from 'react';
import styled from 'styled-components';

const TaxRateFormDialogContent = lazy(() => import('./TaxRateFormDialogContent'));

/**
 * Tax rate form dialog.
 */
function TaxRateFormDialog({ dialogName, payload = { action: '', id: null }, isOpen }) {
  return (
    <TaxRateDialog
      name={dialogName}
      title={payload.id ? 'Edit Tax Rate' : 'Create Tax Rate'}
      autoFocus={true}
      canEscapeKeyClose={true}
      isOpen={isOpen}
    >
      <DialogSuspense>
        <TaxRateFormDialogContent dialogName={dialogName} taxRateId={payload.id} />
      </DialogSuspense>
    </TaxRateDialog>
  );
}

const TaxRateDialog = styled(Dialog)`
  max-width: 450px;
`;

export default compose(withDialogRedux())(TaxRateFormDialog);
