// @ts-nocheck

import { DialogContent } from '@bigcapital/webapp/components';
import React from 'react';
import { useProjectBillableEntries } from '../../hooks';

const ProjectBillableEntriesContext = React.createContext();

/**
 * Project billable entries provider.
 * @returns
 */
function ProjectBillableEntriesProvider({ projectId, ...props }) {
  // Handle fetch project billable entries.
  const { data: billableEntries, isLoading: isProjectBillableEntriesLoading } = useProjectBillableEntries(projectId, {
    enabled: !!projectId,
  });

  //state provider.
  const provider = {
    projectId,
    billableEntries,
  };

  return (
    <DialogContent isLoading={isProjectBillableEntriesLoading}>
      <ProjectBillableEntriesContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useProjectBillableEntriesContext = () => React.useContext(ProjectBillableEntriesContext);

export { ProjectBillableEntriesProvider, useProjectBillableEntriesContext };
