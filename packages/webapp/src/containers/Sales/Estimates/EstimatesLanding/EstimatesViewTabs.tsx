import { Alignment, Navbar, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import { DashboardViewsTabs } from '@bigcapital/webapp/components';

import withEstimates from './withEstimates';
import withEstimatesActions from './withEstimatesActions';

import { compose, transfromViewsToTabs } from '@bigcapital/webapp/utils';
import { useEstimatesListContext } from './EstimatesListProvider';

/**
 * Estimates views tabs.
 */
function EstimateViewTabs({
  // #withEstimatesActions
  setEstimatesTableState,

  // #withEstimates
  estimatesCurrentView,
}) {
  // Estimates list context.
  const { estimatesViews } = useEstimatesListContext();

  // Estimates views.
  const tabs = transfromViewsToTabs(estimatesViews);

  // Handle tab change.
  const handleTabsChange = (viewSlug) => {
    setEstimatesTableState({ viewSlug: viewSlug || null });
  };

  return (
    <Navbar className={'navbar--dashboard-views'}>
      <NavbarGroup align={Alignment.LEFT}>
        <DashboardViewsTabs
          currentViewSlug={estimatesCurrentView}
          resourceName={'estimates'}
          tabs={tabs}
          onChange={handleTabsChange}
        />
      </NavbarGroup>
    </Navbar>
  );
}

export default compose(
  withEstimatesActions,
  withEstimates(({ estimatesTableState }) => ({
    estimatesCurrentView: estimatesTableState.viewSlug,
  })),
)(EstimateViewTabs);
