import { Button, Classes, Intent, NavbarGroup } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import { useInventoryAdjustmentDrawerContext } from './InventoryAdjustmentDrawerProvider';

import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';

import { Can, DrawerActionsBar, Icon, FormattedMessage as T } from '@bigcapital/webapp/components';
import { AbilitySubject, InventoryAdjustmentAction } from '@bigcapital/webapp/constants/abilityOption';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Inventory adjustment detail actions bar.
 */
function InventoryAdjustmentDetailActionsBar({
  // #withAlertsActions
  openAlert,
}) {
  const { inventoryId } = useInventoryAdjustmentDrawerContext();

  // Handle delete inventory adjustment.
  const handleDeleteInventoryAdjustment = () => {
    openAlert('inventory-adjustment-delete', { inventoryId });
  };

  return (
    <Can I={InventoryAdjustmentAction.Delete} a={AbilitySubject.InventoryAdjustment}>
      <DrawerActionsBar>
        <NavbarGroup>
          <Button
            className={Classes.MINIMAL}
            icon={<Icon icon={'trash-16'} iconSize={16} />}
            text={<T id={'delete'} />}
            intent={Intent.DANGER}
            onClick={handleDeleteInventoryAdjustment}
          />
        </NavbarGroup>
      </DrawerActionsBar>
    </Can>
  );
}

export default compose(withAlertsActions)(InventoryAdjustmentDetailActionsBar);
