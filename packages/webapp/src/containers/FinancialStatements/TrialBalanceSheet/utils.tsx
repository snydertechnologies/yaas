import { castArray } from 'lodash';
import moment from 'moment';
// @ts-nocheck
import React from 'react';

import { useAppQueryString } from '@bigcapital/webapp/hooks';
import { transformToForm } from '@bigcapital/webapp/utils';
import { transformFilterFormToQuery } from '../common';

/**
 * Retrieves the default trial balance query.
 */
export function getDefaultTrialBalanceQuery() {
  return {
    fromDate: moment().startOf('year').format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
    basis: 'accrual',
    filterByOption: 'with-transactions',
    branchesIds: [],
  };
}

/**
 * Parses the trial balance sheet query of browser location.
 */
const parseTrialBalanceSheetQuery = (locationQuery) => {
  const defaultQuery = getDefaultTrialBalanceQuery();

  const transformed = {
    ...defaultQuery,
    ...transformToForm(locationQuery, defaultQuery),
  };
  return {
    ...transformed,

    // Ensures the branches ids is always array.
    branchesIds: castArray(transformed.branchesIds),
  };
};

/**
 * Retrieves the trial balance sheet query.
 */
export const useTrialBalanceSheetQuery = () => {
  // Retrieves location query.
  const [locationQuery, setLocationQuery] = useAppQueryString();

  // Merges the default filter query with location URL query.
  const query = React.useMemo(() => parseTrialBalanceSheetQuery(locationQuery), [locationQuery]);

  return {
    query,
    locationQuery,
    setLocationQuery,
  };
};

/**
 * Retrieves the trial balance sheet http query.
 * @returns {object}
 */
export const useTrialBalanceSheetHttpQuery = () => {
  const { query } = useTrialBalanceSheetQuery();

  return React.useMemo(() => transformFilterFormToQuery(query), [query]);
};
