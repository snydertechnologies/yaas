// @ts-nocheck
import { createDeepEqualSelector } from '@bigcapital/webapp/utils';
import { paginationLocationQuery } from '@bigcapital/webapp/store/selectors';

const exchangeRateTableState = (state) => {
  return state.exchangeRates.tableState;
};

export const getExchangeRatesTableStateFactory = () =>
  createDeepEqualSelector(paginationLocationQuery, exchangeRateTableState, (locationQuery, tableState) => {
    return {
      ...locationQuery,
      ...tableState,
    };
  });
