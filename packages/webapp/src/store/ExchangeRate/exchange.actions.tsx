// @ts-nocheck
import t from '@bigcapital/webapp/store/types';

export const setExchangeRateTableState = (queries) => {
  return {
    type: t.EXCHANGE_RATES_TABLE_STATE_SET,
    payload: { queries },
  };
};
