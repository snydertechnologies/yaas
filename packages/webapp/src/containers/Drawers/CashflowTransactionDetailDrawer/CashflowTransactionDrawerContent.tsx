// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/components/Drawers/CashflowTransactionDrawer.scss';

import { DrawerBody } from '@bigcapital/webapp/components';
import CashflowTransactionDrawerDetails from './CashflowTransactionDrawerDetails';
import { CashflowTransactionDrawerProvider } from './CashflowTransactionDrawerProvider';

/**
 * Cash flow transction drawer content.
 */
export default function CashflowTransactionDrawerContent({
  // #ownProp
  referenceId,
}) {
  return (
    <CashflowTransactionDrawerProvider referenceId={referenceId}>
      <DrawerBody>
        <CashflowTransactionDrawerDetails />
      </DrawerBody>
    </CashflowTransactionDrawerProvider>
  );
}
