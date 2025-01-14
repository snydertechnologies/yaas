// @ts-nocheck
import { paginationLocationQuery } from '@bigcapital/webapp/store/selectors';
import { createDeepEqualSelector } from '@bigcapital/webapp/utils';

// Accounts table state selector
const cashflowAccountsTableStateSelector = (state, props) => state.cashflowAccounts.tableState;

// Get accounts table state marged with location query.
export const getCashflowAccountsTableStateFactory = () =>
  createDeepEqualSelector(paginationLocationQuery, cashflowAccountsTableStateSelector, (locationQuery, tableState) => {
    return {
      ...locationQuery,
      ...tableState,
    };
  });
