// @ts-nocheck
import React from 'react';

import { Features } from '@bigcapital/webapp/constants';
import { useBranches } from '@bigcapital/webapp/hooks/query';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { FinancialHeaderLoadingSkeleton } from '../FinancialHeaderLoadingSkeleton';

const BalanceSheetHeaderDimensionsPanelContext = React.createContext();

/**
 * BL sheet header provider.
 * @returns
 */
function BalanceSheetHeaderDimensionsProvider({ query, ...props }) {
  // Features guard.
  const { featureCan } = useFeatureCan();
  const isBranchFeatureCan = featureCan(Features.Branches);

  // Fetches the branches list.
  const { isLoading: isBranchesLoading, data: branches } = useBranches(query, {
    enabled: isBranchFeatureCan,
    keepPreviousData: true,
  });

  // Provider
  const provider = {
    branches,
    isBranchesLoading,
  };

  return isBranchesLoading ? (
    <FinancialHeaderLoadingSkeleton />
  ) : (
    <BalanceSheetHeaderDimensionsPanelContext.Provider value={provider} {...props} />
  );
}

const useBalanceSheetHeaderDimensionsPanelContext = () => React.useContext(BalanceSheetHeaderDimensionsPanelContext);

export { BalanceSheetHeaderDimensionsProvider, useBalanceSheetHeaderDimensionsPanelContext };
