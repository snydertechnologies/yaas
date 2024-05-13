// @ts-nocheck
import React from 'react';
import { Drawer, DrawerSuspense } from '@bigcapital/webapp/components';
import withDrawers from '@bigcapital/webapp/containers/Drawer/withDrawers';

import { compose } from '@bigcapital/webapp/utils';

const ItemDetailDrawerContent = React.lazy(() => import('./ItemDetailDrawerContent'));

/**
 * Item Detail drawer.
 */
function ItemDetailDrawer({
  name,

  // #withDrawer
  isOpen,
  payload: { itemId },
}) {
  return (
    <Drawer isOpen={isOpen} name={name} style={{ minWidth: '700px', maxWidth: '900px' }} size={'65%'}>
      <DrawerSuspense>
        <ItemDetailDrawerContent itemId={itemId} />
      </DrawerSuspense>
    </Drawer>
  );
}
export default compose(withDrawers())(ItemDetailDrawer);
