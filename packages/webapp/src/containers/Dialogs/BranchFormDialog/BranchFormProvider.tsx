import { DialogContent } from '@bigcapital/webapp/components';
import { useBranch, useCreateBranch, useEditBranch } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';

const BranchFormContext = React.createContext();

/**
 * Branch form dialog provider.
 */
function BranchFormProvider({ dialogName, branchId, ...props }) {
  // Create and edit warehouse mutations.
  const { mutateAsync: createBranchMutate } = useCreateBranch();
  const { mutateAsync: editBranchMutate } = useEditBranch();

  // Handle fetch branch detail.
  const { data: branch, isLoading: isBranchLoading } = useBranch(branchId, {
    enabled: !!branchId,
  });

  // State provider.
  const provider = {
    dialogName,
    branch,
    branchId,
    createBranchMutate,
    editBranchMutate,
  };

  return (
    <DialogContent isLoading={isBranchLoading}>
      <BranchFormContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}
const useBranchFormContext = () => React.useContext(BranchFormContext);

export { BranchFormProvider, useBranchFormContext };
