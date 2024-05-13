import { Button, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import { FeatureCan, Icon, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Features } from '@bigcapital/webapp/constants';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Warehouse actions.
 */
function WarehousesActions({
  //#ownProps
  openDialog,
}) {
  const handleClickNewWarehouse = () => {
    openDialog('warehouse-form');
  };

  return (
    <React.Fragment>
      <FeatureCan feature={Features.Warehouses}>
        <Button icon={<Icon icon="plus" iconSize={12} />} onClick={handleClickNewWarehouse} intent={Intent.PRIMARY}>
          <T id={'warehouses.label.new_warehouse'} />
        </Button>
      </FeatureCan>
    </React.Fragment>
  );
}

export default compose(withDialogActions)(WarehousesActions);
