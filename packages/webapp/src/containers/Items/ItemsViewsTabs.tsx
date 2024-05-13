import { DashboardViewsTabs } from '@bigcapital/webapp/components';
import { Alignment, Navbar, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { withRouter } from 'react-router-dom';

import withItems from './withItems';
import withItemsActions from './withItemsActions';

import { compose, transfromViewsToTabs } from '@bigcapital/webapp/utils';
import { useItemsListContext } from './ItemsListProvider';

/**
 * Items views tabs.
 */
function ItemsViewsTabs({
  // #withItemsActions
  setItemsTableState,

  // #withItems
  itemsCurrentView,
}) {
  const { itemsViews } = useItemsListContext();

  // Mapped items views.
  const tabs = transfromViewsToTabs(itemsViews);

  // Handles the active tab change.
  const handleTabChange = (viewSlug) => {
    setItemsTableState({ viewSlug });
  };

  return (
    <Navbar className="navbar--dashboard-views">
      <NavbarGroup align={Alignment.LEFT}>
        <DashboardViewsTabs
          currentViewSlug={itemsCurrentView}
          resourceName={'items'}
          tabs={tabs}
          onChange={handleTabChange}
        />
      </NavbarGroup>
    </Navbar>
  );
}

export default compose(
  withRouter,
  withItems(({ itemsTableState }) => ({
    itemsCurrentView: itemsTableState?.viewSlug,
  })),
  withItemsActions,
)(ItemsViewsTabs);
