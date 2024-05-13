import { Drawer, DrawerSuspense } from '@bigcapital/webapp/components';
import withDrawers from '@bigcapital/webapp/containers/Drawer/withDrawers';
// @ts-nocheck
import React from 'react';

import { compose } from '@bigcapital/webapp/utils';

const CustomerDetailsDrawerContent = React.lazy(() => import('./CustomerDetailsDrawerContent'));

/**
 * Contact detail drawer.
 */
function CustomerDetailsDrawer({
  name,

  // #withDrawer
  isOpen,
  payload: { customerId },
}) {
  return (
    <Drawer isOpen={isOpen} name={name} size={'750px'}>
      <DrawerSuspense>
        <CustomerDetailsDrawerContent customerId={customerId} />
      </DrawerSuspense>
    </Drawer>
  );
}

export default compose(withDrawers())(CustomerDetailsDrawer);
