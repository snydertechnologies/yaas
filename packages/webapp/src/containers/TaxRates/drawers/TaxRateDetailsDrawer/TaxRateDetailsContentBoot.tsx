import { DrawerLoading } from '@bigcapital/webapp/components';
import { useTaxRate } from '@bigcapital/webapp/hooks/query/taxRates';
// @ts-nocheck
import React, { createContext, useContext } from 'react';

const TaxRateDetailsContext = createContext();

interface TaxRateDetailsContentBootProps {
  taxRateId: number;
}

/**
 * Tax rate details content boot.
 * @returns {JSX}
 */
export function TaxRateDetailsContentBoot({ taxRateId, ...props }: TaxRateDetailsContentBootProps) {
  const {
    data: taxRate,
    isFetching: isTaxRateFetching,
    isLoading: isTaxRateLoading,
  } = useTaxRate(taxRateId, { keepPreviousData: true });

  const provider = {
    isTaxRateLoading,
    isTaxRateFetching,
    taxRate,
    taxRateId,
  };

  return (
    <DrawerLoading loading={isTaxRateLoading}>
      <TaxRateDetailsContext.Provider value={provider} {...props} />
    </DrawerLoading>
  );
}

export const useTaxRateDetailsContext = () => useContext(TaxRateDetailsContext);
