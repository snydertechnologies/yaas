import { DrawerBody, DrawerHeaderContent, FormattedMessage as T } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import QuickVendorFormDrawer from './QuickVendorFormDrawer';

/**
 * Quick create/edit vendor drawer.
 */
export default function QuickWriteVendorDrawerContent({ displayName }) {
  return (
    <React.Fragment>
      <DrawerHeaderContent name={DRAWERS.QUICK_CREATE_CUSTOMER} title={<T id={'create_a_new_vendor'} />} />
      <DrawerBody>
        <QuickVendorFormDrawer displayName={displayName} />
      </DrawerBody>
    </React.Fragment>
  );
}
