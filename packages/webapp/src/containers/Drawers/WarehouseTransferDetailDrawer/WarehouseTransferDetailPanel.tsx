// @ts-nocheck
import React from 'react';
import { CommercialDocBox } from '@bigcapital/webapp/components';

import WarehouseTransferDetailHeader from './WarehouseTransferDetailHeader';
import WarehouseTransferDetailTable from './WarehouseTransferDetailTable';

/**
 * Warehouse transfer details panel.
 */
export default function WarehouseTransferDetailPanel() {
  return (
    <CommercialDocBox>
      <WarehouseTransferDetailHeader />
      <WarehouseTransferDetailTable />
    </CommercialDocBox>
  );
}
