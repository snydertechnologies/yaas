import { Alignment, Navbar, NavbarGroup } from '@blueprintjs/core';
import { pick } from 'lodash';
// @ts-nocheck
import React from 'react';

import { DashboardViewsTabs } from '@bigcapital/webapp/components';
import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import { useManualJournalsContext } from './ManualJournalsListProvider';
import withManualJournals from './withManualJournals';
import withManualJournalsActions from './withManualJournalsActions';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Manual journal views tabs.
 */
function ManualJournalsViewTabs({
  // #withManualJournalsActions
  setManualJournalsTableState,

  // #withManualJournals
  journalsTableState,
}) {
  // Manual journals context.
  const { journalsViews } = useManualJournalsContext();

  const tabs = journalsViews.map((view) => ({
    ...pick(view, ['name', 'id']),
  }));

  const handleClickNewView = () => {};

  // Handles the tab change.
  const handleTabChange = (viewId) => {
    setManualJournalsTableState({
      customViewId: viewId || null,
    });
  };

  return (
    <Navbar className="navbar--dashboard-views">
      <NavbarGroup align={Alignment.LEFT}>
        <DashboardViewsTabs
          resourceName={'manual-journals'}
          currentViewId={journalsTableState.customViewId}
          tabs={tabs}
          onChange={handleTabChange}
          onNewViewTabClick={handleClickNewView}
        />
      </NavbarGroup>
    </Navbar>
  );
}

export default compose(
  withManualJournalsActions,
  withDashboardActions,
  withManualJournals(({ manualJournalsTableState }) => ({
    journalsTableState: manualJournalsTableState,
  })),
)(ManualJournalsViewTabs);
