// @ts-nocheck
import React from 'react';
import { DrawerBody } from '@bigcapital/webapp/components';

import EstimateDetail from './EstimateDetail';
import { EstimateDetailDrawerProvider } from './EstimateDetailDrawerProvider';

/**
 * Estimate detail drawer content.
 */
export default function EstimateDetailDrawerContent({
  // #ownProp
  estimateId,
}) {
  return (
    <EstimateDetailDrawerProvider estimateId={estimateId}>
      <DrawerBody>
        <EstimateDetail />
      </DrawerBody>
    </EstimateDetailDrawerProvider>
  );
}
