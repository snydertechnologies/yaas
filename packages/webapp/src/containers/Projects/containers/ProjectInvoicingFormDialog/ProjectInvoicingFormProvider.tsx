import { DialogContent } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';

const ProjectInvoicingFormContext = React.createContext();

/**
 * Project invoicing form provider.
 * @returns
 */
function ProjectInvoicingFormProvider({
  // #ownProps
  dialogName,
  ...props
}) {
  // State provider.
  const provider = {
    dialogName,
  };

  return (
    <DialogContent isLoading={false}>
      <ProjectInvoicingFormContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useProjectInvoicingFormContext = () => React.useContext(ProjectInvoicingFormContext);

export { ProjectInvoicingFormProvider, useProjectInvoicingFormContext };
