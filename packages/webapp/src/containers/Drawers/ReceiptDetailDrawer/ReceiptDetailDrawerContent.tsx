import { DrawerBody } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';

import ReceiptDetail from './ReceiptDetail';
import { ReceiptDetailDrawerProvider } from './ReceiptDetailDrawerProvider';

/**
 * Receipt detail drawer content.
 */
export default function ReceiptDetailDrawerContent({
  // #ownProp
  receiptId,
}) {
  return (
    <ReceiptDetailDrawerProvider receiptId={receiptId}>
      <DrawerBody>
        <ReceiptDetail />
      </DrawerBody>
    </ReceiptDetailDrawerProvider>
  );
}
