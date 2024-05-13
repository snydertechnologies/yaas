import { useAppQueryString } from '@bigcapital/webapp/hooks';
import { transformToForm } from '@bigcapital/webapp/utils';
import { castArray } from 'lodash';
import moment from 'moment';
// @ts-nocheck
import { useMemo } from 'react';
import * as Yup from 'yup';
import { getDefaultARAgingSummaryQuery } from '../ARAgingSummary/common';

/**
 * Default query of customers balance summary.
 */
export const getDefaultCustomersBalanceQuery = () => {
  return {
    asDate: moment().endOf('day').format('YYYY-MM-DD'),
    filterByOption: 'with-transactions',
    customersIds: [],
  };
};

/**
 * Retrieves the customers balance query schema.
 * @returns {Yup}
 */
export const getCustomersBalanceQuerySchema = () => {
  return Yup.object().shape({
    asDate: Yup.date().required().label('asDate'),
  });
};

/**
 * Parses the customer balance summary query.
 */
const parseCustomersBalanceSummaryQuery = (locationQuery) => {
  const defaultQuery = getDefaultARAgingSummaryQuery();

  const transformed = {
    ...defaultQuery,
    ...transformToForm(locationQuery, defaultQuery),
  };
  return {
    ...transformed,
    customersIds: castArray(transformed.customersIds),
  };
};

/**
 * Getter/setter query state of customers balance summary.
 */
export const useCustomerBalanceSummaryQuery = () => {
  const [locationQuery, setLocationQuery] = useAppQueryString();

  const query = useMemo(() => parseCustomersBalanceSummaryQuery(locationQuery), [locationQuery]);
  return { query, locationQuery, setLocationQuery };
};
