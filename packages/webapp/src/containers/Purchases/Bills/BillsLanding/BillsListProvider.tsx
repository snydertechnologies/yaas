import { isEmpty } from 'lodash';
// @ts-nocheck
import React, { createContext } from 'react';

import { DashboardInsider } from '@bigcapital/webapp/components/Dashboard';
import { useBills, useResourceMeta, useResourceViews } from '@bigcapital/webapp/hooks/query';

import { getFieldsFromResourceMeta } from '@bigcapital/webapp/utils';

const BillsListContext = createContext();

/**
 * Accounts chart data provider.
 */
function BillsListProvider({ query, tableStateChanged, ...props }) {
  // Fetch accounts resource views and fields.
  const { data: billsViews, isLoading: isViewsLoading } = useResourceViews('bills');

  // Fetch the accounts resource fields.
  const { data: resourceMeta, isLoading: isResourceLoading, isFetching: isResourceFetching } = useResourceMeta('bills');

  // Fetch accounts list according to the given custom view id.
  const {
    data: { bills, pagination, filterMeta },
    isLoading: isBillsLoading,
    isFetching: isBillsFetching,
  } = useBills(query, { keepPreviousData: true });

  // Detarmines the datatable empty status.
  const isEmptyStatus = isEmpty(bills) && !isBillsLoading && !tableStateChanged;

  // Provider payload.
  const provider = {
    bills,
    pagination,
    billsViews,

    resourceMeta,
    fields: getFieldsFromResourceMeta(resourceMeta.fields),
    isResourceLoading,
    isResourceFetching,

    isBillsLoading,
    isBillsFetching,
    isViewsLoading,
    isEmptyStatus,
  };

  return (
    <DashboardInsider loading={isViewsLoading || isResourceLoading} name={'bills'}>
      <BillsListContext.Provider value={provider} {...props} />
    </DashboardInsider>
  );
}

const useBillsListContext = () => React.useContext(BillsListContext);

export { BillsListProvider, useBillsListContext };
