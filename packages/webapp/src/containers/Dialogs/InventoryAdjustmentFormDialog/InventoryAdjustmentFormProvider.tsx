import { DialogContent } from '@bigcapital/webapp/components';
import { Features } from '@bigcapital/webapp/constants';
import {
  useAccounts,
  useBranches,
  useCreateInventoryAdjustment,
  useItem,
  useWarehouses,
} from '@bigcapital/webapp/hooks/query';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
// @ts-nocheck
import React, { useState, createContext } from 'react';

const InventoryAdjustmentContext = createContext();

/**
 * Inventory adjustment dialog provider.
 */
function InventoryAdjustmentFormProvider({ itemId, dialogName, ...props }) {
  // Features guard.
  const { featureCan } = useFeatureCan();
  const isWarehouseFeatureCan = featureCan(Features.Warehouses);
  const isBranchFeatureCan = featureCan(Features.Branches);

  // Fetches accounts list.
  const { isFetching: isAccountsLoading, data: accounts } = useAccounts();

  // Fetches the item details.
  const { isFetching: isItemLoading, data: item } = useItem(itemId);

  // Fetch warehouses list.
  const {
    data: warehouses,
    isLoading: isWarehouesLoading,
    isSuccess: isWarehousesSuccess,
  } = useWarehouses({}, { enabled: isWarehouseFeatureCan });

  // Fetches the branches list.
  const {
    data: branches,
    isLoading: isBranchesLoading,
    isSuccess: isBranchesSuccess,
  } = useBranches({}, { enabled: isBranchFeatureCan });

  const { mutateAsync: createInventoryAdjMutate } = useCreateInventoryAdjustment();

  // Submit payload.
  const [submitPayload, setSubmitPayload] = useState({});

  // Determines whether the warehouse and branches are loading.
  const isFeatureLoading = isWarehouesLoading || isBranchesLoading;

  // State provider.
  const provider = {
    item,
    itemId,
    branches,
    warehouses,
    accounts,

    dialogName,
    submitPayload,

    isBranchesSuccess,
    isWarehousesSuccess,
    isAccountsLoading,
    isItemLoading,
    isFeatureLoading,
    isWarehouesLoading,
    isBranchesLoading,

    createInventoryAdjMutate,
    setSubmitPayload,
  };

  return (
    <DialogContent isLoading={isAccountsLoading || isItemLoading}>
      <InventoryAdjustmentContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useInventoryAdjContext = () => React.useContext(InventoryAdjustmentContext);

export { InventoryAdjustmentFormProvider, useInventoryAdjContext };
