// @ts-nocheck
import React from 'react';

import { Features } from '@bigcapital/webapp/constants';
import { useBranches } from '@bigcapital/webapp/hooks/query';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { FinancialHeaderLoadingSkeleton } from '../FinancialHeaderLoadingSkeleton';

const ProfitLossSheetHeaderDimensionsPanelContext = React.createContext();

/**
 * profit loss sheet header provider.
 * @returns
 */
function ProfitLossSheetHeaderDimensionsProvider({ query, ...props }) {
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
    <ProfitLossSheetHeaderDimensionsPanelContext.Provider value={provider} {...props} />
  );
}

const useProfitLossSheetPanelContext = () => React.useContext(ProfitLossSheetHeaderDimensionsPanelContext);

export { ProfitLossSheetHeaderDimensionsProvider, useProfitLossSheetPanelContext };
