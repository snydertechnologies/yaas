import { DashboardInsider } from '@bigcapital/webapp/components/Dashboard';
import { useTaxRates } from '@bigcapital/webapp/hooks/query/taxRates';
import { isEmpty } from 'lodash';
// @ts-nocheck
import React from 'react';

const TaxRatesLandingContext = React.createContext();

/**
 * Cash Flow data provider.
 */
function TaxRatesLandingProvider({ tableState, ...props }) {
  // Fetch cash flow list .
  const {
    data: taxRates,
    isFetching: isTaxRatesFetching,
    isLoading: isTaxRatesLoading,
  } = useTaxRates({}, { keepPreviousData: true });

  // Detarmines whether the table should show empty state.
  const isEmptyStatus = isEmpty(taxRates) && !isTaxRatesLoading;

  // Provider payload.
  const provider = {
    taxRates,
    isTaxRatesFetching,
    isTaxRatesLoading,
    isEmptyStatus,
  };

  return (
    <DashboardInsider name={'tax-rate-form'}>
      <TaxRatesLandingContext.Provider value={provider} {...props} />
    </DashboardInsider>
  );
}

const useTaxRatesLandingContext = () => React.useContext(TaxRatesLandingContext);

export { TaxRatesLandingProvider, useTaxRatesLandingContext };
