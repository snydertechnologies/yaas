// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { CommercialDocBox } from '@bigcapital/webapp/components';

import InventoryAdjustmentDetailHeader from './InventoryAdjustmentDetailHeader';
import InventoryAdjustmentDetailTable from './InventoryAdjustmentDetailTable';

export default function InventoryAdjustmentDetailTab() {
  return (
    <CommercialDocBox>
      <InventoryAdjustmentDetailHeader />
      <InventoryAdjustmentDetailTable />
    </CommercialDocBox>
  );
}
