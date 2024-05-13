// @ts-nocheck
import { isEqual } from 'lodash';

import { paginationLocationQuery } from '@bigcapital/webapp/store/selectors';
import { createDeepEqualSelector } from '@bigcapital/webapp/utils';
import { defaultTableQueryState } from './customers.reducer';

const customerTableStateSelector = (state) => state.customers.tableState;

export const getCustomersTableStateFactory = () =>
  createDeepEqualSelector(paginationLocationQuery, customerTableStateSelector, (locationQuery, tableState) => {
    return {
      ...locationQuery,
      ...tableState,
    };
  });

export const customersTableStateChangedFactory = () =>
  createDeepEqualSelector(customerTableStateSelector, (tableState) => {
    return !isEqual(tableState, defaultTableQueryState);
  });
