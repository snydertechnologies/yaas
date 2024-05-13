import { DrawerBody, DrawerHeaderContent, FormattedMessage as T } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import QuickCustomerFormDrawer from './QuickCustomerFormDrawer';

/**
 * Quick create/edit customer drawer.
 */
export default function QuickCreateCustomerDrawerContent({ displayName }) {
  return (
    <React.Fragment>
      <DrawerHeaderContent name={DRAWERS.QUICK_CREATE_CUSTOMER} title={<T id={'create_a_new_customer'} />} />
      <DrawerBody>
        <QuickCustomerFormDrawer displayName={displayName} />
      </DrawerBody>
    </React.Fragment>
  );
}
