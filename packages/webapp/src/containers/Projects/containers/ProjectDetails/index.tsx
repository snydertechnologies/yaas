import { DashboardPageContent } from '@bigcapital/webapp/components';
import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import { compose } from '@bigcapital/webapp/utils';
// @ts-nocheck
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProjectDetailActionsBar from './ProjectDetailActionsBar';
import { ProjectDetailProvider } from './ProjectDetailProvider';
import ProjectDetailTabs from './ProjectDetailTabs';

/**
 * Project tabs.
 * @returns
 */
function ProjectTabs({
  // #withDashboardActions
  changePageTitle,
}) {
  const {
    state: { projectName, projectId },
  } = useLocation();

  useEffect(() => {
    changePageTitle(projectName);
  }, [changePageTitle, projectName]);

  return (
    <ProjectDetailProvider projectId={projectId}>
      <ProjectDetailActionsBar />
      <DashboardPageContent>
        <ProjectDetailTabs />
      </DashboardPageContent>
    </ProjectDetailProvider>
  );
}

export default compose(withDashboardActions)(ProjectTabs);
