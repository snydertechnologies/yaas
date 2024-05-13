import { DialogContent } from '@bigcapital/webapp/components';
import { Features } from '@bigcapital/webapp/constants';
import { useBranches, useEditVendorOpeningBalance, useVendor } from '@bigcapital/webapp/hooks/query';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
// @ts-nocheck
import React from 'react';
import { transfromVendorToForm } from './utils';

const VendorOpeningBalanceContext = React.createContext();

/**
 * Vendor Opening balance provider.
 * @returns
 */
function VendorOpeningBalanceFormProvider({ query, vendorId, dialogName, ...props }) {
  // Features guard.
  const { featureCan } = useFeatureCan();
  const isBranchFeatureCan = featureCan(Features.Branches);

  const { mutateAsync: editVendorOpeningBalanceMutate } = useEditVendorOpeningBalance();

  // Fetches the branches list.
  const {
    data: branches,
    isLoading: isBranchesLoading,
    isSuccess: isBranchesSuccess,
  } = useBranches(query, { enabled: isBranchFeatureCan });

  // Handle fetch vendor details.
  const { data: vendor, isLoading: isVendorLoading } = useVendor(vendorId, {
    enabled: !!vendorId,
  });

  // State provider.
  const provider = {
    branches,
    vendor: transfromVendorToForm(vendor),
    isBranchesSuccess,
    isBranchesLoading,
    dialogName,
    editVendorOpeningBalanceMutate,
  };

  return (
    <DialogContent isLoading={isBranchesLoading || isVendorLoading}>
      <VendorOpeningBalanceContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useVendorOpeningBalanceContext = () => React.useContext(VendorOpeningBalanceContext);

export { VendorOpeningBalanceFormProvider, useVendorOpeningBalanceContext };
