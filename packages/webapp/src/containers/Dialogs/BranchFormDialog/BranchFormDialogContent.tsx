// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/pages/Branches/BranchFormDialog.scss';

import BranchForm from './BranchForm';
import { BranchFormProvider } from './BranchFormProvider';

/**
 * Branch form dialog content.
 */
export default function BranchFormDialogContent({
  // #ownProps
  dialogName,
  branchId,
}) {
  return (
    <BranchFormProvider branchId={branchId} dialogName={dialogName}>
      <BranchForm />
    </BranchFormProvider>
  );
}
