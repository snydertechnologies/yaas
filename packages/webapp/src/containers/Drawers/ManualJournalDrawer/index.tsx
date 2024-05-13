import { Drawer, DrawerSuspense } from '@bigcapital/webapp/components';
import withDrawers from '@bigcapital/webapp/containers/Drawer/withDrawers';
// @ts-nocheck
import React, { lazy } from 'react';

import { compose } from '@bigcapital/webapp/utils';

const ManualJournalDrawerContent = lazy(() => import('./ManualJournalDrawerContent'));

/**
 * Manual journal drawer.
 */
function ManualJournalDrawer({
  name,

  // #withDrawer
  isOpen,
  payload: { manualJournalId },
}) {
  return (
    <Drawer isOpen={isOpen} name={name} size={'65%'} style={{ minWidth: '700px', maxWidth: '900px' }}>
      <DrawerSuspense>
        <ManualJournalDrawerContent manualJournalId={manualJournalId} />
      </DrawerSuspense>
    </Drawer>
  );
}

export default compose(withDrawers())(ManualJournalDrawer);
