import { useAppQueryString } from '@bigcapital/webapp/hooks';
import { transformToForm } from '@bigcapital/webapp/utils';
import { castArray } from 'lodash';
import moment from 'moment';
import { useMemo } from 'react';
import intl from 'react-intl-universal';
// @ts-nocheck
import * as Yup from 'yup';

export const getCustomersTransactionsQuerySchema = () => {
  return Yup.object().shape({
    fromDate: Yup.date().required().label(intl.get('fromDate')),
    toDate: Yup.date().min(Yup.ref('fromDate')).required().label(intl.get('toDate')),
  });
};

export const getCustomersTransactionsDefaultQuery = () => ({
  fromDate: moment().startOf('month').format('YYYY-MM-DD'),
  toDate: moment().format('YYYY-MM-DD'),
  customersIds: [],
  filterByOption: 'with-transactions',
});

const parseCustomersTransactionsQuery = (query) => {
  const defaultQuery = getCustomersTransactionsDefaultQuery();

  const transformedQuery = {
    ...defaultQuery,
    ...transformToForm(query, defaultQuery),
  };
  return {
    ...transformedQuery,
    customersIds: castArray(transformedQuery.customersIds),
  };
};

export const useCustomersTransactionsQuery = () => {
  const [locationQuery, setLocationQuery] = useAppQueryString();

  const query = useMemo(() => parseCustomersTransactionsQuery(locationQuery), [locationQuery]);
  return [query, setLocationQuery];
};
