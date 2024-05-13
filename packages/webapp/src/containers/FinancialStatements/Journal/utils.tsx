import moment from 'moment';
// @ts-nocheck
import React from 'react';

import { useAppQueryString } from '@bigcapital/webapp/hooks';
import { transformToForm } from '@bigcapital/webapp/utils';

/**
 * Retrieves the default journal report query.
 */
export const getDefaultJournalQuery = () => {
  return {
    fromDate: moment().startOf('month').format('YYYY-MM-DD'),
    toDate: moment().format('YYYY-MM-DD'),
    basis: 'accrual',
  };
};

/**
 * Parses balance sheet query.
 */
const parseJournalQuery = (locationQuery) => {
  const defaultQuery = getDefaultJournalQuery();

  return {
    ...defaultQuery,
    ...transformToForm(locationQuery, defaultQuery),
  };
};

/**
 * Retrieves the jorunal sheet query.
 */
export const useJournalQuery = () => {
  // Retrieves location query.
  const [locationQuery, setLocationQuery] = useAppQueryString();

  // Merges the default filter query with location URL query.
  const query = React.useMemo(() => parseJournalQuery(locationQuery), [locationQuery]);

  return {
    query,
    locationQuery,
    setLocationQuery,
  };
};
