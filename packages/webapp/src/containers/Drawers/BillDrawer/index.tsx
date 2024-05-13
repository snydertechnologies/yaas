// @ts-nocheck
import React from 'react';
import { Drawer, DrawerSuspense } from '@bigcapital/webapp/components';
import withDrawers from '@bigcapital/webapp/containers/Drawer/withDrawers';

import { compose } from '@bigcapital/webapp/utils';

const BillDrawerContent = React.lazy(() => import('./BillDrawerContent'));

/**
 * Bill drawer.
 */
function BillDrawer({
  name,
  // #withDrawer
  isOpen,
  payload: { billId },
}) {
  return (
    <Drawer isOpen={isOpen} name={name} style={{ minWidth: '700px', maxWidth: '900px' }} size={'65%'}>
      <DrawerSuspense>
        <BillDrawerContent billId={billId} />
      </DrawerSuspense>
    </Drawer>
  );
}

export default compose(withDrawers())(BillDrawer);
