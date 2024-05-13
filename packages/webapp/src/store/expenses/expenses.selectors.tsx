// @ts-nocheck
import { isEqual } from 'lodash';

import { createDeepEqualSelector } from '@bigcapital/webapp/utils';
import { paginationLocationQuery } from '@bigcapital/webapp/store/selectors';
import { defaultTableQuery } from './expenses.reducer';

// Items table state selectors.
const expensesTableStateSelector = (state) => state.expenses.tableState;

// Retrive expenses table query.
export const getExpensesTableStateFactory = () =>
  createDeepEqualSelector(paginationLocationQuery, expensesTableStateSelector, (locationQuery, tableState) => {
    return {
      ...locationQuery,
      ...tableState,
    };
  });

export const expensesTableStateChangedFactory = () =>
  createDeepEqualSelector(expensesTableStateSelector, (tableState) => {
    return !isEqual(tableState, defaultTableQuery);
  });
