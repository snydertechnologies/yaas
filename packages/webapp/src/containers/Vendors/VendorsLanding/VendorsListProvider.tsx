import { isEmpty } from 'lodash';
// @ts-nocheck
import React, { createContext } from 'react';

import { DashboardInsider } from '@bigcapital/webapp/components';
import { useResourceMeta, useResourceViews, useVendors } from '@bigcapital/webapp/hooks/query';
import { getFieldsFromResourceMeta } from '@bigcapital/webapp/utils';
import { transformVendorsStateToQuery } from './utils';

const VendorsListContext = createContext();

function VendorsListProvider({ tableState, tableStateChanged, ...props }) {
  // Transformes the vendors table state to fetch query.
  const tableQuery = transformVendorsStateToQuery(tableState);

  // Fetch vendors list with pagination meta.
  const {
    data: { vendors, pagination, filterMeta },
    isLoading: isVendorsLoading,
    isFetching: isVendorsFetching,
  } = useVendors(tableQuery, { keepPreviousData: true });

  // Fetch vendors resource views and fields.
  const { data: vendorsViews, isLoading: isVendorsViewsLoading } = useResourceViews('vendors');

  // Fetch the vendors resource fields.
  const {
    data: resourceMeta,
    isLoading: isResourceMetaLoading,
    isFetching: isResourceMetaFetching,
  } = useResourceMeta('vendors');

  // Detarmines the datatable empty status.
  const isEmptyStatus = isEmpty(vendors) && !isVendorsLoading && !tableStateChanged;

  const provider = {
    vendors,
    pagination,
    vendorsViews,

    fields: getFieldsFromResourceMeta(resourceMeta.fields),
    resourceMeta,
    isResourceMetaLoading,
    isResourceMetaFetching,

    isVendorsViewsLoading,

    isVendorsLoading,
    isVendorsFetching,
    isEmptyStatus,
  };

  return (
    <DashboardInsider loading={isVendorsViewsLoading || isResourceMetaLoading} name={'vendors-list'}>
      <VendorsListContext.Provider value={provider} {...props} />
    </DashboardInsider>
  );
}

const useVendorsListContext = () => React.useContext(VendorsListContext);

export { VendorsListProvider, useVendorsListContext };
