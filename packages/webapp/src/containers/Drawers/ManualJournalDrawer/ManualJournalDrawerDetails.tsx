// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { CommercialDocBox } from '@bigcapital/webapp/components';

import ManualJournalDrawerActionBar from './ManualJournalDrawerActionBar';
import ManualJournalDrawerFooter from './ManualJournalDrawerFooter';
import ManualJournalDrawerHeader from './ManualJournalDrawerHeader';
import ManualJournalDrawerTable from './ManualJournalDrawerTable';

/**
 * Manual journal view details.
 */
export default function ManualJournalDrawerDetails() {
  return (
    <ManualJournalDetailsRoot>
      <ManualJournalDrawerActionBar />

      <CommercialDocBox>
        <ManualJournalDrawerHeader />
        <ManualJournalDrawerTable />
        <ManualJournalDrawerFooter />
      </CommercialDocBox>
    </ManualJournalDetailsRoot>
  );
}

const ManualJournalDetailsRoot = styled.div``;
