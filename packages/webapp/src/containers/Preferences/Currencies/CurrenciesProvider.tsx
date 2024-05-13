import { useCurrencies } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React, { createContext, useContext } from 'react';

const CurrenciesContext = createContext();

/**
 * currencies provider.
 */
function CurrenciesProvider({ ...props }) {
  // fetches the currencies list.
  const { data: currencies, isLoading: isCurrenciesLoading } = useCurrencies();

  const state = {
    currencies,
    isCurrenciesLoading,
  };

  return <CurrenciesContext.Provider value={state} {...props} />;
}

const useCurrenciesContext = () => useContext(CurrenciesContext);

export { CurrenciesProvider, useCurrenciesContext };
