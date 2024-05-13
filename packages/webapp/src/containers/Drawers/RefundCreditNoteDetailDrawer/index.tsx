// @ts-nocheck
import React from 'react';

import { Drawer, DrawerSuspense } from '@bigcapital/webapp/components';
import withDrawers from '@bigcapital/webapp/containers/Drawer/withDrawers';

import { compose } from '@bigcapital/webapp/utils';

const RefundCreditNoteDrawerContent = React.lazy(() => import('./RefundCreditNoteDrawerContent'));

/**
 * Refund credit note detail.
 * @returns
 */
function RefundCreditNoteDetailDrawer({
  name,
  // #withDrawer
  isOpen,
  payload: { refundTransactionId },
}) {
  return (
    <Drawer isOpen={isOpen} name={name} style={{ minWidth: '700px', maxWidth: '750px' }} size={'65%'}>
      <DrawerSuspense>
        <RefundCreditNoteDrawerContent refundTransactionId={refundTransactionId} />
      </DrawerSuspense>
    </Drawer>
  );
}
export default compose(withDrawers())(RefundCreditNoteDetailDrawer);
