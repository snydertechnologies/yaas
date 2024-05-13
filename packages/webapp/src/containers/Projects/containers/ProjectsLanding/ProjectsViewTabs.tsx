import { Alignment, Navbar, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import { DashboardViewsTabs } from '@bigcapital/webapp/components';

import { useProjectsListContext } from './ProjectsListProvider';
import withProjects from './withProjects';
import withProjectsActions from './withProjectsActions';

import { compose, transfromViewsToTabs } from '@bigcapital/webapp/utils';

/**
 * Projects views tabs.
 * @returns
 */
function ProjectsViewTabs({
  // #withProjects
  projectsCurrentView,

  // #withProjectsActions
  setProjectsTableState,
}) {
  // Projects list context.
  const { projectsViews } = useProjectsListContext();

  // Projects views.
  const tabs = transfromViewsToTabs(projectsViews);

  // Handle tab change.
  const handleTabsChange = (viewSlug) => {
    setProjectsTableState({ viewSlug: viewSlug || null });
  };

  return (
    <Navbar className={'navbar--dashboard-views'}>
      <NavbarGroup align={Alignment.LEFT}>
        <DashboardViewsTabs
          currentViewSlug={projectsCurrentView}
          resourceName={'projects'}
          tabs={tabs}
          onChange={handleTabsChange}
        />
      </NavbarGroup>
    </Navbar>
  );
}

export default compose(
  withProjects(({ projectsTableState }) => ({
    projectsCurrentView: projectsTableState?.viewSlug,
  })),
  withProjectsActions,
)(ProjectsViewTabs);
