// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/components/Drawers/ManualJournalDrawer.scss';

import { DrawerBody } from '@bigcapital/webapp/components';
import ManualJournalDrawerDetails from './ManualJournalDrawerDetails';
import { ManualJournalDrawerProvider } from './ManualJournalDrawerProvider';

/**
 * Manual Journal drawer content.
 */
export default function ManualJournalDrawerContent({
  // #ownProp
  manualJournalId,
}) {
  return (
    <ManualJournalDrawerProvider manualJournalId={manualJournalId}>
      <DrawerBody>
        <ManualJournalDrawerDetails />
      </DrawerBody>
    </ManualJournalDrawerProvider>
  );
}
