import { useCustomers } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React, { createContext, useContext } from 'react';
import { FinancialHeaderLoadingSkeleton } from '../FinancialHeaderLoadingSkeleton';

const CustomersBalanceSummaryGeneralContext = createContext();

/**
 * Customers balance summary provider.
 */
function CustomersBalanceSummaryGeneralProvider({ ...props }) {
  // Fetches the customers list.
  const {
    data: { customers },
    isFetching: isCustomersFetching,
    isLoading: isCustomersLoading,
  } = useCustomers();

  const provider = {
    isCustomersLoading,
    isCustomersFetching,
    customers,
  };

  const loading = isCustomersLoading;

  return loading ? (
    <FinancialHeaderLoadingSkeleton />
  ) : (
    <CustomersBalanceSummaryGeneralContext.Provider value={provider} {...props} />
  );
}

const useCustomersBalanceSummaryGeneralContext = () => useContext(CustomersBalanceSummaryGeneralContext);

export { CustomersBalanceSummaryGeneralProvider, useCustomersBalanceSummaryGeneralContext };
