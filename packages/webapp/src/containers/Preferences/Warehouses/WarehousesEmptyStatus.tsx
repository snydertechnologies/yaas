import { EmptyStatus, FormattedMessage as T } from '@bigcapital/webapp/components';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { Button, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import { compose } from '@bigcapital/webapp/utils';

function WarehousesEmptyStatus({
  // #withDialogActions
  openDialog,
}) {
  // Handle activate action warehouse.
  const handleActivateWarehouse = () => {
    openDialog('warehouse-activate', {});
  };

  return (
    <EmptyStatus
      title={<T id={'warehouses.empty_status.title'} />}
      description={
        <p>
          <T id={'warehouses.empty_status.description'} />
        </p>
      }
      action={
        <React.Fragment>
          <Button intent={Intent.PRIMARY} large={true} onClick={handleActivateWarehouse}>
            <T id={'warehouses.activate_button'} />
          </Button>
        </React.Fragment>
      }
    />
  );
}

export default compose(withDialogActions)(WarehousesEmptyStatus);
