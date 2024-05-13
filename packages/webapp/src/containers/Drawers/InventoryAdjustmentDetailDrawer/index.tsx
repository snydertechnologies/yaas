// @ts-nocheck
import React from 'react';

import { Drawer, DrawerSuspense } from '@bigcapital/webapp/components';
import withDrawers from '@bigcapital/webapp/containers/Drawer/withDrawers';

import { compose } from '@bigcapital/webapp/utils';

const InventoryAdjustmentDrawerContent = React.lazy(() => import('./InventoryAdjustmentDrawerContent'));

/**
 * Inventory adjustment detail drawer.
 */
function InventoryAdjustmentDetailDrawer({
  name,
  // #withDrawer
  isOpen,
  payload: { inventoryId },
}) {
  return (
    <Drawer isOpen={isOpen} name={name} style={{ minWidth: '700px', maxWidth: '900px' }} size={'65%'}>
      <DrawerSuspense>
        <InventoryAdjustmentDrawerContent inventoryId={inventoryId} />
      </DrawerSuspense>
    </Drawer>
  );
}

export default compose(withDrawers())(InventoryAdjustmentDetailDrawer);
