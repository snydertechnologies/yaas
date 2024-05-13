// @ts-nocheck
import React from 'react';

import { DrawerBody } from '@bigcapital/webapp/components';
import VendorDetails from './VendorDetails';
import { VendorDetailsDrawerProvider } from './VendorDetailsDrawerProvider';

/**
 * Contact detail drawer content.
 */
export default function VendorDetailsDrawerContent({
  // #ownProp
  vendorId,
}) {
  return (
    <VendorDetailsDrawerProvider vendorId={vendorId}>
      <DrawerBody>
        <VendorDetails />
      </DrawerBody>
    </VendorDetailsDrawerProvider>
  );
}
