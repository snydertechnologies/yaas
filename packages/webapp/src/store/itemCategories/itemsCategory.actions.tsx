// @ts-nocheck
import t from '@bigcapital/webapp/store/types';

/**
 * Sets the items categories table state.
 */
export const setItemsCategoriesTableState = (queries) => {
  return {
    type: t.ITEMS_CATEGORIES_TABLE_STATE_SET,
    payload: { queries },
  };
};
