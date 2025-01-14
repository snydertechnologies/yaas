import { Drawer, DrawerSuspense } from '@bigcapital/webapp/components';
import withDrawers from '@bigcapital/webapp/containers/Drawer/withDrawers';
// @ts-nocheck
import React from 'react';

import { compose } from '@bigcapital/webapp/utils';

const ReceiptDetailDrawerContent = React.lazy(() => import('./ReceiptDetailDrawerContent'));

/**
 * Receipt Detail drawer.
 */
function ReceiptDetailDrawer({
  name,
  // #withDrawer
  isOpen,
  payload: { receiptId },
}) {
  return (
    <Drawer isOpen={isOpen} name={name} style={{ minWidth: '700px', maxWidth: '900px' }} size={'65%'}>
      <DrawerSuspense>
        <ReceiptDetailDrawerContent receiptId={receiptId} />
      </DrawerSuspense>
    </Drawer>
  );
}

export default compose(withDrawers())(ReceiptDetailDrawer);
