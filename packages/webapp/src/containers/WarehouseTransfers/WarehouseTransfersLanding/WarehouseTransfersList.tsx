// @ts-nocheck
import React from 'react';

import { DashboardPageContent } from '@bigcapital/webapp/components';
import WarehouseTransfersActionsBar from './WarehouseTransfersActionsBar';
import WarehouseTransfersDataTable from './WarehouseTransfersDataTable';
import WarehouseTransfersViewTabs from './WarehouseTransfersViewTabs';
import withWarehouseTransfers from './withWarehouseTransfers';
import withWarehouseTransfersActions from './withWarehouseTransfersActions';

import { compose, transformTableStateToQuery } from '@bigcapital/webapp/utils';
import { WarehouseTransfersListProvider } from './WarehouseTransfersListProvider';

function WarehouseTransfersList({
  // #withWarehouseTransfers
  warehouseTransferTableState,
  warehouseTransferTableStateChanged,

  // #withWarehouseTransfersActions
  resetWarehouseTransferTableState,
}) {
  // Resets the warehouse transfer table state once the page unmount.
  React.useEffect(
    () => () => {
      resetWarehouseTransferTableState();
    },
    [resetWarehouseTransferTableState],
  );

  return (
    <WarehouseTransfersListProvider
      query={transformTableStateToQuery(warehouseTransferTableState)}
      tableStateChanged={warehouseTransferTableStateChanged}
    >
      <WarehouseTransfersActionsBar />
      <DashboardPageContent>
        <WarehouseTransfersViewTabs />
        <WarehouseTransfersDataTable />
      </DashboardPageContent>
    </WarehouseTransfersListProvider>
  );
}

export default compose(
  withWarehouseTransfersActions,
  withWarehouseTransfers(({ warehouseTransferTableState, warehouseTransferTableStateChanged }) => ({
    warehouseTransferTableState,
    warehouseTransferTableStateChanged,
  })),
)(WarehouseTransfersList);
