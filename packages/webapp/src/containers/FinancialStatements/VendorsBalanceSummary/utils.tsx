import { useAppQueryString } from '@bigcapital/webapp/hooks';
import { transformToForm } from '@bigcapital/webapp/utils';
import { castArray } from 'lodash';
// @ts-nocheck
import moment from 'moment';
import { useMemo } from 'react';
import * as Yup from 'yup';

export const getDefaultVendorsBalanceQuery = () => {
  return {
    asDate: moment().endOf('day').format('YYYY-MM-DD'),
    filterByOption: 'with-transactions',
    vendorsIds: [],
  };
};

export const getVendorsBalanceQuerySchema = () => {
  return Yup.object().shape({
    asDate: Yup.date().required().label('asDate'),
  });
};

export const parseVendorsBalanceSummaryQuery = (locationQuery) => {
  const defaultQuery = getDefaultVendorsBalanceQuery();

  const transformed = {
    ...defaultQuery,
    ...transformToForm(locationQuery, defaultQuery),
  };
  return {
    ...transformed,
    vendorsIds: castArray(transformed.vendorsIds),
  };
};

export const useVendorsBalanceSummaryQuery = () => {
  const [locationQuery, setLocationQuery] = useAppQueryString();

  const query = useMemo(() => parseVendorsBalanceSummaryQuery(locationQuery), [locationQuery]);
  return { query, locationQuery, setLocationQuery };
};
