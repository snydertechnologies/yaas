// @ts-nocheck
import React from 'react';

import { CommercialDocEntriesTable } from '@bigcapital/webapp/components';

import { useVendorCreditDetailDrawerContext } from './VendorCreditDetailDrawerProvider';
import { useVendorCreditReadonlyEntriesTableColumns } from './utils';

import { TableStyle } from '@bigcapital/webapp/constants';

/**
 * Vendor Credit detail table.
 */
export default function VendorCreditDetailTable() {
  const {
    vendorCredit: { entries },
  } = useVendorCreditDetailDrawerContext();

  // Vendor Credit entries table columns.
  const columns = useVendorCreditReadonlyEntriesTableColumns();

  return <CommercialDocEntriesTable columns={columns} data={entries} styleName={TableStyle.Constrant} />;
}
