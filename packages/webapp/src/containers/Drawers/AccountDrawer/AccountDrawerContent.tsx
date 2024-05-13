import { DrawerBody } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/components/Drawers/AccountDrawer.scss';

import AccountDrawerDetails from './AccountDrawerDetails';
import { AccountDrawerProvider } from './AccountDrawerProvider';

/**
 * Account drawer content.
 */
export default function AccountDrawerContent({
  // #ownProp
  accountId,
  name,
}) {
  return (
    <AccountDrawerProvider name={name} accountId={accountId}>
      <DrawerBody>
        <AccountDrawerDetails />
      </DrawerBody>
    </AccountDrawerProvider>
  );
}
