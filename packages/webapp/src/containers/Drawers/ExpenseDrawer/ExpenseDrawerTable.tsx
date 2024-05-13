// @ts-nocheck
import React from 'react';

import { CommercialDocEntriesTable } from '@bigcapital/webapp/components';

import { useExpenseDrawerContext } from './ExpenseDrawerProvider';
import { useExpenseReadEntriesColumns } from './utils';

import { TableStyle } from '@bigcapital/webapp/constants';

/**
 * Expense details table.
 */
export default function ExpenseDrawerTable() {
  // Expense readonly entries columns.
  const columns = useExpenseReadEntriesColumns();

  // Expense drawer context.
  const { expense } = useExpenseDrawerContext();

  return <CommercialDocEntriesTable columns={columns} data={expense.categories} styleName={TableStyle.Constrant} />;
}
