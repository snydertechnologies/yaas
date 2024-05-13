// @ts-nocheck
import { isEqual } from 'lodash';
import { paginationLocationQuery } from '@bigcapital/webapp/store/selectors';
import { createDeepEqualSelector } from '@bigcapital/webapp/utils';
import { defaultTableQuery } from './warehouseTransfer.reducer';

const warehouseTransfersTableStateSelector = (state) => state.warehouseTransfers.tableState;

/**
 * Retrieve warehouse transfers table state.
 */
export const getWarehouseTransfersTableStateFactory = () =>
  createDeepEqualSelector(
    paginationLocationQuery,
    warehouseTransfersTableStateSelector,
    (locationQuery, tableState) => {
      return {
        ...locationQuery,
        ...tableState,
      };
    },
  );

/**
 * Retrieve warehouse transfers table state.
 */
export const isWarehouseTransferTableStateChangedFactory = () =>
  createDeepEqualSelector(warehouseTransfersTableStateSelector, (tableState) => {
    return !isEqual(tableState, defaultTableQuery);
  });
