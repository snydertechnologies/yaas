import { DashboardContentTable, DashboardPageContent } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';

import ProjectsActionsBar from './ProjectsActionsBar';
import ProjectsDataTable from './ProjectsDataTable';
import ProjectsViewTabs from './ProjectsViewTabs';

import withProjects from './withProjects';
import withProjectsActions from './withProjectsActions';

import { compose, transformTableStateToQuery } from '@bigcapital/webapp/utils';
import { ProjectsListProvider } from './ProjectsListProvider';

/**
 * Projects list.
 * @returns
 */
function ProjectsList({
  // #withProjects
  projectsTableState,
  projectsTableStateChanged,

  // #withProjectsActions
  resetProjectsTableState,
}) {
  // Resets the projects table state once the page unmount.
  React.useEffect(
    () => () => {
      resetProjectsTableState();
    },
    [resetProjectsTableState],
  );

  return (
    <ProjectsListProvider
      query={transformTableStateToQuery(projectsTableState)}
      tableStateChanged={projectsTableStateChanged}
    >
      <ProjectsActionsBar />
      <DashboardPageContent>
        <ProjectsViewTabs />

        <DashboardContentTable>
          <ProjectsDataTable />
        </DashboardContentTable>
      </DashboardPageContent>
    </ProjectsListProvider>
  );
}

export default compose(
  withProjects(({ projectsTableState, projectsTableStateChanged }) => ({
    projectsTableState,
    projectsTableStateChanged,
  })),
  withProjectsActions,
)(ProjectsList);
