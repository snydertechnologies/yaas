// @ts-nocheck
import React from 'react';

import { DrawerBody } from '@bigcapital/webapp/components';
import CustomerDetails from './CustomerDetails';
import { CustomerDetailsDrawerProvider } from './CustomerDetailsDrawerProvider';

/**
 * Contact detail drawer content.
 */
export default function CustomerDetailsDrawerContent({
  // #ownProp
  customerId,
}) {
  return (
    <CustomerDetailsDrawerProvider customerId={customerId}>
      <DrawerBody>
        <CustomerDetails />
      </DrawerBody>
    </CustomerDetailsDrawerProvider>
  );
}
