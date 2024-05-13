import { Card } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';

import { useTransactionsByReference } from '@bigcapital/webapp/hooks/query';
import { useVendorCreditDetailDrawerContext } from '../VendorCreditDetailDrawerProvider';
import { useJournalEntriesTransactionsColumns } from './components';

import JournalEntriesTable, {
  AmountDisplayedBaseCurrencyMessage,
} from '@bigcapital/webapp/containers/JournalEntriesTable/JournalEntriesTable';

/**
 * Journal entries vendor credit transactions table.
 */
export function VendorCreditGLEntriesTable() {
  const { vendorCreditId } = useVendorCreditDetailDrawerContext();

  const columns = useJournalEntriesTransactionsColumns();

  // Handle fetch transaction by reference.
  const {
    data: { transactions },
    isLoading: isTransactionLoading,
  } = useTransactionsByReference(
    {
      reference_id: vendorCreditId,
      reference_type: 'vendorCredit',
    },
    { enabled: !!vendorCreditId },
  );

  return (
    <Card>
      <AmountDisplayedBaseCurrencyMessage />
      <JournalEntriesTable columns={columns} data={transactions} loading={isTransactionLoading} />
    </Card>
  );
}
