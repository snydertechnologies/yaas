// @ts-nocheck
import t from '@bigcapital/webapp/store/types';

export const setReceiptsTableState = (queries) => {
  return {
    type: t.RECEIPTS_TABLE_STATE_SET,
    payload: { queries },
  };
};

export const resetReceiptsTableState = () => {
  return {
    type: t.RECEIPTS_TABLE_STATE_RESET,
  };
};
