import { Drawer, DrawerSuspense } from '@bigcapital/webapp/components';
import withDrawers from '@bigcapital/webapp/containers/Drawer/withDrawers';
// @ts-nocheck
import React from 'react';

import { compose } from '@bigcapital/webapp/utils';

const WarehouseTransferDetailDrawerContent = React.lazy(() => import('./WarehouseTransferDetailDrawerContent'));

/**
 * Warehouse transfer detail drawer.
 */
function WarehouseTransferDetailDrawer({
  name,
  // #withDrawer
  isOpen,
  payload: { warehouseTransferId },
}) {
  return (
    <Drawer isOpen={isOpen} name={name} style={{ minWidth: '700px', maxWidth: '900px' }} size={'65%'}>
      <DrawerSuspense>
        <WarehouseTransferDetailDrawerContent warehouseTransferId={warehouseTransferId} />
      </DrawerSuspense>
    </Drawer>
  );
}

export default compose(withDrawers())(WarehouseTransferDetailDrawer);
