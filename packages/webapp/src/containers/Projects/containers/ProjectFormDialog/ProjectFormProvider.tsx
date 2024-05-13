import { DialogContent } from '@bigcapital/webapp/components';
import { useCustomers } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';
import { useCreateProject, useEditProject, useProject } from '../../hooks';

const ProjectFormContext = React.createContext();

/**
 * Project form provider.
 * @returns
 */
function ProjectFormProvider({
  // #ownProps
  dialogName,
  projectId,
  ...props
}) {
  // Create and edit project mutations.
  const { mutateAsync: createProjectMutate } = useCreateProject();
  const { mutateAsync: editProjectMutate } = useEditProject();

  // Handle fetch project detail.
  const { data: project, isLoading: isProjectLoading } = useProject(projectId, {
    enabled: !!projectId,
  });

  // Handle fetch customers data table or list
  const {
    data: { customers },
    isLoading: isCustomersLoading,
  } = useCustomers({ page_size: 10000 });

  const isNewMode = !projectId;

  // State provider.
  const provider = {
    customers,
    dialogName,
    project,
    projectId,
    isNewMode,
    createProjectMutate,
    editProjectMutate,
  };

  return (
    <DialogContent isLoading={isCustomersLoading || isProjectLoading}>
      <ProjectFormContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useProjectFormContext = () => React.useContext(ProjectFormContext);

export { ProjectFormProvider, useProjectFormContext };
