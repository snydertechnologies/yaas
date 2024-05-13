import { Drawer, DrawerSuspense } from '@bigcapital/webapp/components';
import withDrawers from '@bigcapital/webapp/containers/Drawer/withDrawers';
// @ts-nocheck
import React from 'react';

import { compose } from '@bigcapital/webapp/utils';

const VendorDetailsDrawerContent = React.lazy(() => import('./VendorDetailsDrawerContent'));

/**
 * Vendor details drawer.
 */
function VendorDetailsDrawer({
  name,

  // #withDrawer
  isOpen,
  payload: { vendorId },
}) {
  return (
    <Drawer isOpen={isOpen} name={name} size={'750px'}>
      <DrawerSuspense>
        <VendorDetailsDrawerContent vendorId={vendorId} />
      </DrawerSuspense>
    </Drawer>
  );
}

export default compose(withDrawers())(VendorDetailsDrawer);
