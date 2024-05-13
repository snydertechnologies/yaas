// @ts-nocheck
import React from 'react';
import { Drawer, DrawerSuspense } from '@bigcapital/webapp/components';
import withDrawers from '@bigcapital/webapp/containers/Drawer/withDrawers';

import { compose } from '@bigcapital/webapp/utils';

const PaymentMadeDetailContent = React.lazy(() => import('./PaymentMadeDetailContent'));

/**
 * Payment made detail drawer.
 */
function PaymentMadeDetailDrawer({
  name,
  // #withDrawer
  isOpen,
  payload: { paymentMadeId },
}) {
  return (
    <Drawer isOpen={isOpen} name={name} size={'65%'} style={{ minWidth: '700px', maxWidth: '900px' }}>
      <DrawerSuspense>
        <PaymentMadeDetailContent paymentMadeId={paymentMadeId} />
      </DrawerSuspense>
    </Drawer>
  );
}

export default compose(withDrawers())(PaymentMadeDetailDrawer);
