// @ts-nocheck
import React from 'react';

import { CommercialDocEntriesTable } from '@bigcapital/webapp/components';
import { useManualJournalDrawerContext } from './ManualJournalDrawerProvider';
import { useManualJournalEntriesColumns } from './utils';

import { TableStyle } from '@bigcapital/webapp/constants';

/**
 * Manual journal drawer table.
 */
export default function ManualJournalDrawerTable() {
  // Retrieves the readonly manual journal entries columns.
  const columns = useManualJournalEntriesColumns();

  // Manual journal drawer context.
  const { manualJournal } = useManualJournalDrawerContext();

  return <CommercialDocEntriesTable columns={columns} data={manualJournal.entries} styleName={TableStyle.Constrant} />;
}
