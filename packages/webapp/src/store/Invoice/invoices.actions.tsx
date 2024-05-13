// @ts-nocheck
import t from '@bigcapital/webapp/store/types';

export const setInvoicesTableState = (queries) => {
  return {
    type: t.INVOICES_TABLE_STATE_SET,
    payload: { queries },
  };
};

export const resetInvoicesTableState = () => {
  return {
    type: t.INVOICES_TABLE_STATE_RESET,
  };
};

export const setSelectedRowsItems = () => {};
