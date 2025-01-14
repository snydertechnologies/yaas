// @ts-nocheck
import React from 'react';

import { Features } from '@bigcapital/webapp/constants';
import { useBranches } from '@bigcapital/webapp/hooks/query';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
import { FinancialHeaderLoadingSkeleton } from '../FinancialHeaderLoadingSkeleton';

const GeneralLedgerHeaderDimensionsPanelContext = React.createContext();

/**
 * General Ledger Header Dimensions Panel provider.
 * @returns {JSX.Element}
 */
function GeneralLedgerHeaderDimensionsPanelProvider({ query, ...props }) {
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
    <GeneralLedgerHeaderDimensionsPanelContext.Provider value={provider} {...props} />
  );
}

const useGeneralLedgerHeaderDimensionsContext = () => React.useContext(GeneralLedgerHeaderDimensionsPanelContext);

export { GeneralLedgerHeaderDimensionsPanelProvider, useGeneralLedgerHeaderDimensionsContext };
