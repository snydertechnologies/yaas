// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, NavbarGroup, Classes, NavbarDivider, Intent } from '@blueprintjs/core';

import { useWarehouseDetailDrawerContext } from './WarehouseTransferDetailDrawerProvider';
import { DrawerActionsBar, Icon, FormattedMessage as T } from '@bigcapital/webapp/components';

import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Warehouse transfer detail actions bar.
 */
function WarehouseTransferDetailActionsBar({
  // #withAlertsActions
  openAlert,

  // #withDrawerActions
  closeDrawer,
}) {
  const history = useHistory();

  const { warehouseTransferId } = useWarehouseDetailDrawerContext();

  // Handle edit warehosue transfer.
  const handleEditWarehosueTransfer = () => {
    history.push(`/warehouses-transfers/${warehouseTransferId}/edit`);
    closeDrawer(DRAWERS.WAREHOUSE_TRANSFER_DETAILS);
  };

  // Handle delete warehouse transfer.
  const handleDeletetWarehosueTransfer = () => {
    openAlert('warehouse-transfer-delete', { warehouseTransferId });
  };

  return (
    <DrawerActionsBar>
      <NavbarGroup>
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon="pen-18" />}
          text={<T id={'warehouse_transfer.action.edit_warehouse_transfer'} />}
          onClick={handleEditWarehosueTransfer}
        />
        <NavbarDivider />
        <Button
          className={Classes.MINIMAL}
          icon={<Icon icon={'trash-16'} iconSize={16} />}
          text={<T id={'delete'} />}
          intent={Intent.DANGER}
          onClick={handleDeletetWarehosueTransfer}
        />
      </NavbarGroup>
    </DrawerActionsBar>
  );
}

export default compose(withDialogActions, withAlertsActions, withDrawerActions)(WarehouseTransferDetailActionsBar);
