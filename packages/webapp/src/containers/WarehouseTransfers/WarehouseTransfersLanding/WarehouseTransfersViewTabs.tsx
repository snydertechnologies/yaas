import { DashboardViewsTabs } from '@bigcapital/webapp/components';
import { Alignment, Navbar, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import { compose, transfromViewsToTabs } from '@bigcapital/webapp/utils';
import { useWarehouseTranfersListContext } from './WarehouseTransfersListProvider';
import withWarehouseTransfers from './withWarehouseTransfers';
import withWarehouseTransfersActions from './withWarehouseTransfersActions';

/**
 * Warehouse transfer view tabs.
 */
function WarehouseTransfersViewTabs({
  // #withWarehouseTransfers
  warehouseTransferCurrentView,

  // #withWarehouseTransfersActions
  setWarehouseTransferTableState,
}) {
  const { WarehouseTransferView } = useWarehouseTranfersListContext();

  const tabs = transfromViewsToTabs(WarehouseTransferView);

  // Handles click a new view tab.
  const handleClickNewView = () => {};

  // Handles the active tab chaing.
  const handleTabsChange = (viewSlug) => {
    setWarehouseTransferTableState({ viewSlug });
  };

  return (
    <Navbar className={'navbar--dashboard-views'}>
      <NavbarGroup align={Alignment.LEFT}>
        <DashboardViewsTabs
          currentViewSlug={warehouseTransferCurrentView}
          resourceName={'warehouse_transfer'}
          tabs={tabs}
          onNewViewTabClick={handleClickNewView}
          onChange={handleTabsChange}
        />
      </NavbarGroup>
    </Navbar>
  );
}

export default compose(
  withWarehouseTransfersActions,
  withWarehouseTransfers(({ warehouseTransferTableState }) => ({
    warehouseTransferCurrentView: warehouseTransferTableState?.viewSlug,
  })),
)(WarehouseTransfersViewTabs);
