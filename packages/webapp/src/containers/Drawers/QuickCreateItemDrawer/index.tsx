import { Drawer, DrawerSuspense } from '@bigcapital/webapp/components';
import withDrawers from '@bigcapital/webapp/containers/Drawer/withDrawers';
// @ts-nocheck
import React from 'react';

import { compose } from '@bigcapital/webapp/utils';

const QuickCretaeItemDrawerContent = React.lazy(() => import('./QuickCreateItemDrawerContent'));

/**
 * Quick create item.
 */
function QuickCreateItemDrawer({
  // #ownProps
  name,

  // #withDrawer
  isOpen,
  payload,
}) {
  return (
    <Drawer
      isOpen={isOpen}
      name={name}
      style={{ minWidth: '800px', maxWidth: '1000px' }}
      size={'72%'}
      payload={payload}
    >
      <DrawerSuspense>
        <QuickCretaeItemDrawerContent itemName={payload.name} />
      </DrawerSuspense>
    </Drawer>
  );
}

export default compose(withDrawers())(QuickCreateItemDrawer);
