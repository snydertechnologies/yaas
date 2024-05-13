import { Features } from '@bigcapital/webapp/constants';
import { useBranches } from '@bigcapital/webapp/hooks/query';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
// @ts-nocheck
import React from 'react';
import { FinancialHeaderLoadingSkeleton } from '../FinancialHeaderLoadingSkeleton';

const ARAgingSummaryHeaderDimensonsContext = React.createContext();

/**
 * ARAging summary header dismensions provider.
 * @returns {JSX.Element}
 */
function ARAgingSummaryHeaderDimensionsProvider({ query, ...props }) {
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
    <ARAgingSummaryHeaderDimensonsContext.Provider value={provider} {...props} />
  );
}

const useARAgingSummaryHeaderDimensonsContext = () => React.useContext(ARAgingSummaryHeaderDimensonsContext);

export { ARAgingSummaryHeaderDimensionsProvider, useARAgingSummaryHeaderDimensonsContext };
