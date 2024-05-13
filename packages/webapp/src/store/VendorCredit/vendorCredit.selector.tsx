// @ts-nocheck
import { isEqual } from 'lodash';
import { paginationLocationQuery } from '@bigcapital/webapp/store/selectors';
import { createDeepEqualSelector } from '@bigcapital/webapp/utils';
import { defaultTableQuery } from './VendorCredit.reducer';

const vendorCreditsTableStateSelector = (state) => {
  return state.vendorCredit.tableState;
};

/**
 * Retrieve vendor credit table state.
 */
export const getVendorCreditTableStateFactory = () =>
  createDeepEqualSelector(paginationLocationQuery, vendorCreditsTableStateSelector, (locationQuery, tableState) => {
    return {
      ...locationQuery,
      ...tableState,
    };
  });

/**
 * Retrieve vendor credit table state.
 */
export const isVendorCreditTableStateChangedFactory = () =>
  createDeepEqualSelector(vendorCreditsTableStateSelector, (tableState) => {
    return !isEqual(tableState, defaultTableQuery);
  });
