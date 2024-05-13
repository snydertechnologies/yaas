import { castArray } from 'lodash';
import moment from 'moment';
// @ts-nocheck
import React, { useMemo } from 'react';

import * as R from 'ramda';
import intl from 'react-intl-universal';
import * as Yup from 'yup';

import { useAppQueryString } from '@bigcapital/webapp/hooks';
import { transformToForm } from '@bigcapital/webapp/utils';

/**
 * Retrieves the project profitability validation schema.
 */
export const getProjectProfitabilitySummaryValidationSchema = () =>
  Yup.object().shape({
    dateRange: Yup.string().optional(),
    fromDate: Yup.date().required().label(intl.get('fromDate')),
    toDate: Yup.date().min(Yup.ref('fromDate')).required().label(intl.get('toDate')),
    filterByOption: Yup.string(),
  });

/**
 * Retrieves the project profitability summary default values.
 */
export const getDefaultProjectProfitabilitySummaryQuery = () => ({
  fromDate: moment().startOf('year').format('YYYY-MM-DD'),
  toDate: moment().endOf('year').format('YYYY-MM-DD'),
  basis: 'cash',
  filterByOption: 'without-zero-balance',
  projectsIds: [],
});

/**
 * Parses project profitability summary query.
 */
const parseProjectProfitabilityQuery = (locationQuery) => {
  const defaultQuery = getDefaultProjectProfitabilitySummaryQuery();

  const transformed = {
    ...defaultQuery,
    ...transformToForm(locationQuery, defaultQuery),
  };
  return {
    ...transformed,
    projectsIds: castArray(transformed.projectsIds),
  };
};

/**
 * Retrieves the project profitability summary query.
 */
export const useProjectProfitabilitySummaryQuery = () => {
  // Retrieves location query.
  const [locationQuery, setLocationQuery] = useAppQueryString();

  // Merges the default filter query with location URL query.
  const query = useMemo(() => parseProjectProfitabilityQuery(locationQuery), [locationQuery]);
  return {
    query,
    locationQuery,
    setLocationQuery,
  };
};
