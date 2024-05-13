// @ts-nocheck
import { transformTableStateToQuery } from '@bigcapital/webapp/utils';

export const transformCustomersStateToQuery = (tableState) => {
  return {
    ...transformTableStateToQuery(tableState),
    inactive_mode: tableState.inactiveMode,
  };
};
