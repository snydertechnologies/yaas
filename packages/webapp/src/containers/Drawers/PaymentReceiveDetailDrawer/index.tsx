// @ts-nocheck
import React from 'react';
import { Drawer, DrawerSuspense } from '@bigcapital/webapp/components';
import withDrawers from '@bigcapital/webapp/containers/Drawer/withDrawers';

import { compose } from '@bigcapital/webapp/utils';

const PaymentReceiveDetailContent = React.lazy(() => import('./PaymentReceiveDetailContent'));

/**
 * Payment receive detail drawer
 */
function PaymentReceiveDetailDrawer({
  name,
  // #withDrawer
  isOpen,
  payload: { paymentReceiveId },
}) {
  return (
    <Drawer isOpen={isOpen} name={name} size={'65%'} style={{ minWidth: '700px', maxWidth: '900px' }}>
      <DrawerSuspense>
        <PaymentReceiveDetailContent paymentReceiveId={paymentReceiveId} />
      </DrawerSuspense>
    </Drawer>
  );
}

export default compose(withDrawers())(PaymentReceiveDetailDrawer);
