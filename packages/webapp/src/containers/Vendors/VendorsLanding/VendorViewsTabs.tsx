import { DashboardViewsTabs } from '@bigcapital/webapp/components';
import { Alignment, Navbar, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { useVendorsListContext } from './VendorsListProvider';

import withVendors from './withVendors';
import withVendorsActions from './withVendorsActions';

import { compose, transfromViewsToTabs } from '@bigcapital/webapp/utils';

/**
 * Vendors views tabs.
 */
function VendorViewsTabs({
  // #withVendorsActions
  setVendorsTableState,

  // #withVendors
  vendorsCurrentView,
}) {
  const { vendorsViews } = useVendorsListContext();

  // Transformes the resource views to tabs.
  const tabs = transfromViewsToTabs(vendorsViews);

  // Handle dashboard tabs change.
  const handleTabsChange = (viewSlug) => {
    setVendorsTableState({ viewSlug });
  };

  return (
    <Navbar className="navbar--dashboard-views">
      <NavbarGroup align={Alignment.LEFT}>
        <DashboardViewsTabs
          currentViewSlug={vendorsCurrentView}
          resourceName={'vendors'}
          tabs={tabs}
          onChange={handleTabsChange}
        />
      </NavbarGroup>
    </Navbar>
  );
}

export default compose(
  withVendorsActions,
  withVendors(({ vendorsTableState }) => ({
    vendorsCurrentView: vendorsTableState.viewSlug,
  })),
)(VendorViewsTabs);
