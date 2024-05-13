// @ts-nocheck
import React from 'react';

import { Features } from '@bigcapital/webapp/constants';
import { useBranches, useWarehouses } from '@bigcapital/webapp/hooks/query';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { FinancialHeaderLoadingSkeleton } from '../FinancialHeaderLoadingSkeleton';

const InventoryItemDetailsHeaderDimensionsPanelContext = React.createContext();

/**
 * Inventory Item details header provider.
 * @returns
 */
function InventoryItemDetailsHeaderDimensionsProvider({ ...props }) {
  // Features guard.
  const { featureCan } = useFeatureCan();

  // Detarmines whether the warehouses feature is accessible.
  const isWarehouseFeatureCan = featureCan(Features.Warehouses);

  // Detarmines whether the branches feature is accessible.
  const isBranchesFeatureCan = featureCan(Features.Branches);

  // Fetches the warehouses list.
  const { data: warehouses, isLoading: isWarehouesLoading } = useWarehouses(null, { enabled: isWarehouseFeatureCan });

  // Fetches the branches list.
  const { data: branches, isLoading: isBranchesLoading } = useBranches(null, {
    enabled: isBranchesFeatureCan,
  });

  // Provider
  const provider = {
    warehouses,
    branches,
    isWarehouesLoading,
    isBranchesLoading,
  };

  return isWarehouesLoading || isBranchesLoading ? (
    <FinancialHeaderLoadingSkeleton />
  ) : (
    <InventoryItemDetailsHeaderDimensionsPanelContext.Provider value={provider} {...props} />
  );
}

const useInventoryItemDetailsHeaderDimensionsPanelContext = () =>
  React.useContext(InventoryItemDetailsHeaderDimensionsPanelContext);

export { InventoryItemDetailsHeaderDimensionsProvider, useInventoryItemDetailsHeaderDimensionsPanelContext };
