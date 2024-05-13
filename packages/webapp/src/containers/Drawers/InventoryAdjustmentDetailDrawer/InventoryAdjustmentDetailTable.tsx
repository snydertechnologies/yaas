// @ts-nocheck
import React from 'react';

import { CommercialDocEntriesTable } from '@bigcapital/webapp/components';
import { useInventoryAdjustmentDrawerContext } from './InventoryAdjustmentDrawerProvider';
import { useInventoryAdjustmentEntriesColumns } from './utils';

/**
 * Inventory adjustment detail entries table.
 */
export default function InventoryAdjustmentDetailTable() {
  // Inventory adjustment entries columns.
  const columns = useInventoryAdjustmentEntriesColumns();

  // Inventory adjustment details drawer context.
  const { inventoryAdjustment } = useInventoryAdjustmentDrawerContext();

  return (
    <CommercialDocEntriesTable columns={columns} data={inventoryAdjustment.entries} className={'table-constrant'} />
  );
}
