// @ts-nocheck
import { isEqual } from 'lodash';
import { paginationLocationQuery } from '@bigcapital/webapp/store/selectors';
import { createDeepEqualSelector } from '@bigcapital/webapp/utils';
import { defaultTableQuery } from './creditNote.reducer';

const creditsTableStateSelector = (state) => state.creditNotes.tableState;

/**
 * Retrieve credit notes table state.
 */
export const getCreditNotesTableStateFactory = () =>
  createDeepEqualSelector(paginationLocationQuery, creditsTableStateSelector, (locationQuery, tableState) => {
    return {
      ...locationQuery,
      ...tableState,
    };
  });

/**
 * Retrieve credit notes table state.
 */
export const isCreditNotesTableStateChangedFactory = () =>
  createDeepEqualSelector(creditsTableStateSelector, (tableState) => {
    return !isEqual(tableState, defaultTableQuery);
  });
