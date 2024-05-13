import { Drawer, DrawerSuspense } from '@bigcapital/webapp/components';
import withDrawers from '@bigcapital/webapp/containers/Drawer/withDrawers';
// @ts-nocheck
import React, { lazy } from 'react';

import { compose } from '@bigcapital/webapp/utils';

const CategorizeTransactionContent = lazy(() => import('./CategorizeTransactionContent'));

/**
 * Categorize the uncategorized transaction drawer.
 */
function CategorizeTransactionDrawer({
  name,
  // #withDrawer
  isOpen,
  payload: { uncategorizedTransactionId },
}) {
  return (
    <Drawer isOpen={isOpen} name={name} style={{ minWidth: '480px', maxWidth: '600px' }} size={'40%'}>
      <DrawerSuspense>
        <CategorizeTransactionContent uncategorizedTransactionId={uncategorizedTransactionId} />
      </DrawerSuspense>
    </Drawer>
  );
}

export default compose(withDrawers())(CategorizeTransactionDrawer);
