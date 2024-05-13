import { EmptyStatus, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { Button, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import { compose } from '@bigcapital/webapp/utils';

function BranchesEmptyStatus({
  // #withDialogActions
  openDialog,
}) {
  // Handle activate action branch.
  const handleActivateBranch = () => {
    openDialog('branch-activate', {});
  };

  return (
    <EmptyStatus
      title={<T id={'branches.empty_status.title'} />}
      description={
        <p>
          <T id={'branches.empty_status.description'} />
        </p>
      }
      action={
        <React.Fragment>
          <Button intent={Intent.PRIMARY} large={true} onClick={handleActivateBranch}>
            <T id={'branches.activate_button'} />
          </Button>
        </React.Fragment>
      }
    />
  );
}
export default compose(withDialogActions)(BranchesEmptyStatus);
