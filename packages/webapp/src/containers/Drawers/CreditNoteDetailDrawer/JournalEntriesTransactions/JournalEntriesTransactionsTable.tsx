// @ts-nocheck
import React from 'react';
import { Card } from '@bigcapital/webapp/components';

import { useCreditNoteDetailDrawerContext } from '../CreditNoteDetailDrawerProvider';
import { useTransactionsByReference } from '@bigcapital/webapp/hooks/query';
import { useJournalEntriesTransactionsColumns } from './components';

import JournalEntriesTable, {
  AmountDisplayedBaseCurrencyMessage,
} from '@bigcapital/webapp/containers/JournalEntriesTable/JournalEntriesTable';

/**
 * Journal entries table.
 */
export function CreditNoteGLEntriesTable() {
  const { creditNoteId } = useCreditNoteDetailDrawerContext();

  // Credit note GL entries table columns.
  const columns = useJournalEntriesTransactionsColumns();

  // Handle fetch transaction by reference.
  const {
    data: { transactions },
    isLoading: isTransactionLoading,
  } = useTransactionsByReference(
    {
      reference_id: creditNoteId,
      reference_type: 'creditNote',
    },
    { enabled: !!creditNoteId },
  );

  return (
    <Card>
      <AmountDisplayedBaseCurrencyMessage />

      <JournalEntriesTable columns={columns} data={transactions} loading={isTransactionLoading} />
    </Card>
  );
}
