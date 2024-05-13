// @ts-nocheck
import React from 'react';
import { useParams } from 'react-router-dom';

import '@bigcapital/webapp/style/pages/ManualJournal/MakeJournal.scss';

import MakeJournalEntriesForm from './MakeJournalEntriesForm';
import { MakeJournalProvider } from './MakeJournalProvider';

/**
 * Make journal entries page.
 */
export default function MakeJournalEntriesPage() {
  const { id: journalId } = useParams();

  return (
    <MakeJournalProvider journalId={journalId}>
      <MakeJournalEntriesForm />
    </MakeJournalProvider>
  );
}
