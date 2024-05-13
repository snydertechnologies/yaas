import { DrawerBody } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';

import VendorCreditDetail from './VendorCreditDetail';
import { VendorCreditDetailDrawerProvider } from './VendorCreditDetailDrawerProvider';

/**
 * Vendor credit detail drawer content.
 */
export default function VendorCreditDetailDrawerContent({ vendorCreditId }) {
  return (
    <VendorCreditDetailDrawerProvider vendorCreditId={vendorCreditId}>
      <DrawerBody>
        <VendorCreditDetail />
      </DrawerBody>
    </VendorCreditDetailDrawerProvider>
  );
}
