// @ts-nocheck
import { isEqual } from 'lodash';

import { paginationLocationQuery } from '@bigcapital/webapp/store/selectors';
import { createDeepEqualSelector } from '@bigcapital/webapp/utils';
import { defaultTableQuery } from './accounts.reducer';

// Accounts table state selector
const accountsTableStateSelector = (state, props) => state.accounts.tableState;

// Get accounts table state marged with location query.
export const getAccountsTableStateFactory = () =>
  createDeepEqualSelector(paginationLocationQuery, accountsTableStateSelector, (locationQuery, tableState) => {
    return {
      ...locationQuery,
      ...tableState,
    };
  });

export const accountsTableStateChangedFactory = () =>
  createDeepEqualSelector(accountsTableStateSelector, (tableState) => {
    return !isEqual(tableState, defaultTableQuery);
  });
