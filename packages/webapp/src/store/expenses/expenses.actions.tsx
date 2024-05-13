// @ts-nocheck
import t from '@bigcapital/webapp/store/types';

/**
 * Sets global table state of the table.
 * @param {object} queries
 */
export const setExpensesTableState = (queries) => {
  return {
    type: t.EXPENSES_TABLE_STATE_SET,
    payload: { queries },
  };
};

export const resetExpensesTableState = () => {
  return {
    type: t.EXPENSES_TABLE_STATE_RESET,
  };
};
