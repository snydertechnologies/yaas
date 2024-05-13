// @ts-nocheck
import { isEqual } from 'lodash';

import { paginationLocationQuery } from '@bigcapital/webapp/store/selectors';
import { createDeepEqualSelector } from '@bigcapital/webapp/utils';
import { defaultTableQuery } from './manualJournals.reducers';

const manualJournalsTableState = (state) => state.manualJournals.tableState;

// Retrieve manual jouranls table state.
export const getManualJournalsTableStateFactory = () =>
  createDeepEqualSelector(paginationLocationQuery, manualJournalsTableState, (locationQuery, tableQuery) => {
    return {
      ...locationQuery,
      ...tableQuery,
    };
  });

export const manualJournalTableStateChangedFactory = () =>
  createDeepEqualSelector(manualJournalsTableState, (tableState) => {
    return !isEqual(tableState, defaultTableQuery);
  });
