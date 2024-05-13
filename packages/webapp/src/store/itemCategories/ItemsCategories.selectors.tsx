// @ts-nocheck
import { paginationLocationQuery } from '@bigcapital/webapp/store/selectors';
import { createDeepEqualSelector } from '@bigcapital/webapp/utils';

// Items categories table state.
const itemsCategoriesTableStateSelector = (state) => state.itemsCategories.tableState;

// Get items categories table state marged with location query.
export const getItemsCategoriesTableStateFactory = () =>
  createDeepEqualSelector(paginationLocationQuery, itemsCategoriesTableStateSelector, (locationQuery, tableState) => {
    return {
      ...locationQuery,
      ...tableState,
    };
  });
