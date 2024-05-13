// @ts-nocheck
import { isEqual } from 'lodash';

import { paginationLocationQuery } from '@bigcapital/webapp/store/selectors';
import { createDeepEqualSelector } from '@bigcapital/webapp/utils';
import { defaultTableQuery } from './paymentMades.reducer';

const paymentMadesTableStateSelector = (state) => state.paymentMades.tableState;

// Get payment mades table state marged with location query.
export const getPaymentMadesTableStateFactory = () =>
  createDeepEqualSelector(paginationLocationQuery, paymentMadesTableStateSelector, (locationQuery, tableState) => {
    return {
      ...locationQuery,
      ...tableState,
    };
  });

export const paymentsTableStateChangedFactory = () =>
  createDeepEqualSelector(paymentMadesTableStateSelector, (tableState) => {
    return !isEqual(tableState, defaultTableQuery);
  });
