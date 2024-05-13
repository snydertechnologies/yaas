import { Button, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import { FeatureCan, Icon, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Features } from '@bigcapital/webapp/constants';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';

function BranchesActions({
  //#ownProps
  openDialog,
}) {
  const handleClickNewBranche = () => {
    openDialog('branch-form');
  };

  return (
    <React.Fragment>
      <FeatureCan feature={Features.Branches}>
        <Button icon={<Icon icon="plus" iconSize={12} />} onClick={handleClickNewBranche} intent={Intent.PRIMARY}>
          <T id={'branches.label.new_branch'} />
        </Button>
      </FeatureCan>
    </React.Fragment>
  );
}

export default compose(withDialogActions)(BranchesActions);
