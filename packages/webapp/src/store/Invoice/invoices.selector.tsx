// @ts-nocheck
import { isEqual } from 'lodash';
import { paginationLocationQuery } from '@bigcapital/webapp/store/selectors';
import { createDeepEqualSelector } from '@bigcapital/webapp/utils';
import { defaultTableQuery } from './invoices.reducer';

const invoicesTableStateSelector = (state) => state.salesInvoices.tableState;

/**
 * Retrieve invoices table state.
 */
export const getInvoicesTableStateFactory = () =>
  createDeepEqualSelector(paginationLocationQuery, invoicesTableStateSelector, (locationQuery, tableState) => {
    return {
      ...locationQuery,
      ...tableState,
    };
  });

/**
 * Retrieve invoices table state.
 */
export const isInvoicesTableStateChangedFactory = () =>
  createDeepEqualSelector(invoicesTableStateSelector, (tableState) => {
    return !isEqual(tableState, defaultTableQuery);
  });
