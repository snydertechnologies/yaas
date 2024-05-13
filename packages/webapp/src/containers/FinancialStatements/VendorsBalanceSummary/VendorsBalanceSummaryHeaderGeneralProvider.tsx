// @ts-nocheck
import React from 'react';

import { useVendors } from '@bigcapital/webapp/hooks/query';
import { FinancialHeaderLoadingSkeleton } from '../FinancialHeaderLoadingSkeleton';

const VendorsBalanceSummaryGeneralPanelContext = React.createContext();

/**
 * Vendors balance summary provider.
 */
function VendorsBalanceSummaryGeneralPanelProvider({ filter, ...props }) {
  // Fetch vendors list with pagination meta.
  const {
    data: { vendors },
    isLoading: isVendorsLoading,
    isFetching: isVendorsFetching,
  } = useVendors({ page_size: 1000000 });

  // Provider.
  const provider = {
    vendors,
    isVendorsFetching,
    isVendorsLoading,
  };

  const loading = isVendorsLoading;

  return loading ? (
    <FinancialHeaderLoadingSkeleton />
  ) : (
    <VendorsBalanceSummaryGeneralPanelContext.Provider value={provider} {...props} />
  );
}

const useVendorsBalanceSummaryGeneralPanelContext = () => React.useContext(VendorsBalanceSummaryGeneralPanelContext);

export { VendorsBalanceSummaryGeneralPanelProvider, useVendorsBalanceSummaryGeneralPanelContext };
