// @ts-nocheck
import React from 'react';

import { CommercialDocEntriesTable } from '@bigcapital/webapp/components';

import { useInvoiceReadonlyEntriesColumns } from './utils';
import { useInvoiceDetailDrawerContext } from './InvoiceDetailDrawerProvider';

import { TableStyle } from '@bigcapital/webapp/constants';

/**
 * Invoice readonly details entries table columns.
 */
export default function InvoiceDetailTable() {
  // Invoice readonly entries table columns.
  const columns = useInvoiceReadonlyEntriesColumns();

  // Invoice details drawer context.
  const {
    invoice: { entries },
  } = useInvoiceDetailDrawerContext();

  return <CommercialDocEntriesTable columns={columns} data={entries} styleName={TableStyle.Constrant} />;
}
