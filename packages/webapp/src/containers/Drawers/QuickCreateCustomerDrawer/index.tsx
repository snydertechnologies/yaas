import { Drawer, DrawerSuspense } from '@bigcapital/webapp/components';
import withDrawers from '@bigcapital/webapp/containers/Drawer/withDrawers';
// @ts-nocheck
import React from 'react';

import { compose } from '@bigcapital/webapp/utils';

const QuickCreateCustomerDrawerContent = React.lazy(() => import('./QuickCreateCustomerDrawerContent'));

/**
 * Quick Create customer
 */
function QuickCreateCustomerDrawer({
  name,

  // #withDrawer
  isOpen,
  payload,
}) {
  return (
    <Drawer isOpen={isOpen} name={name} style={{ minWidth: '700px', maxWidth: '900px' }} size={'80%'}>
      <DrawerSuspense>
        <QuickCreateCustomerDrawerContent displayName={payload.displayName} />
      </DrawerSuspense>
    </Drawer>
  );
}

export default compose(withDrawers())(QuickCreateCustomerDrawer);
