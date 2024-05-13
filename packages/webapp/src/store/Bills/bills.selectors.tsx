// @ts-nocheck
import { isEqual } from 'lodash';

import { paginationLocationQuery } from '@bigcapital/webapp/store/selectors';
import { createDeepEqualSelector } from '@bigcapital/webapp/utils';
import { defaultTableQuery } from './bills.reducer';

const billsTableStateSelector = (state) => state.bills.tableState;

// Get bills table state marged with location query.
export const getBillsTableStateFactory = () =>
  createDeepEqualSelector(paginationLocationQuery, billsTableStateSelector, (locationQuery, tableState) => {
    return {
      ...locationQuery,
      ...tableState,
    };
  });

export const billsTableStateChangedFactory = () =>
  createDeepEqualSelector(billsTableStateSelector, (tableState) => {
    return !isEqual(tableState, defaultTableQuery);
  });
