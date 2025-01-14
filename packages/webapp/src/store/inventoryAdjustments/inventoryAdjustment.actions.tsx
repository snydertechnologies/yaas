// @ts-nocheck
import t from '@bigcapital/webapp/store/types';

/**
 * Sets the inventory adjustments table state.
 */
export const setInventoryAdjustmentsTableState = (queries) => {
  return {
    type: t.INVENTORY_ADJUSTMENTS_TABLE_STATE_SET,
    payload: { queries },
  };
};
