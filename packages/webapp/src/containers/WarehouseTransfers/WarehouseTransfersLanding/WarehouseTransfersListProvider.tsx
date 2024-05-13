import { DashboardInsider } from '@bigcapital/webapp/components/Dashboard';
import {
  useRefreshWarehouseTransfers,
  useResourceMeta,
  useResourceViews,
  useWarehousesTransfers,
} from '@bigcapital/webapp/hooks/query';
import { isEmpty } from 'lodash';
// @ts-nocheck
import React from 'react';

import { getFieldsFromResourceMeta } from '@bigcapital/webapp/utils';

const WarehouseTransfersListContext = React.createContext();

/**
 * WarehouseTransfer data provider
 */
function WarehouseTransfersListProvider({ query, tableStateChanged, ...props }) {
  // warehouse transfers refresh action.
  const { refresh } = useRefreshWarehouseTransfers();

  // Fetch warehouse transfers list according to the given custom view id.
  const {
    data: { warehousesTransfers, pagination, filterMeta },
    isFetching: isWarehouseTransfersFetching,
    isLoading: isWarehouseTransfersLoading,
  } = useWarehousesTransfers(query, { keepPreviousData: true });

  // Detarmines the datatable empty status.
  const isEmptyStatus = isEmpty(warehousesTransfers) && !tableStateChanged && !isWarehouseTransfersLoading;

  // Fetch create notes resource views and fields.
  const { data: WarehouseTransferView, isLoading: isViewsLoading } = useResourceViews('warehouse_transfer');

  // Fetch the accounts resource fields.
  const {
    data: resourceMeta,
    isLoading: isResourceLoading,
    isFetching: isResourceFetching,
  } = useResourceMeta('warehouse_transfer');

  // Provider payload.
  const provider = {
    warehousesTransfers,
    pagination,

    WarehouseTransferView,
    refresh,

    resourceMeta,
    fields: getFieldsFromResourceMeta(resourceMeta.fields),
    isResourceLoading,
    isResourceFetching,

    isWarehouseTransfersLoading,
    isWarehouseTransfersFetching,
    isViewsLoading,
    isEmptyStatus,
  };

  return (
    <DashboardInsider loading={isViewsLoading || isResourceLoading} name={'warehouse-transfers-list'}>
      <WarehouseTransfersListContext.Provider value={provider} {...props} />
    </DashboardInsider>
  );
}

const useWarehouseTranfersListContext = () => React.useContext(WarehouseTransfersListContext);

export { WarehouseTransfersListProvider, useWarehouseTranfersListContext };
