// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/pages/InventoryAdjustments/List.scss';

import { DashboardContentTable, DashboardPageContent } from '@bigcapital/webapp/components';

import InventoryAdjustmentTable from './InventoryAdjustmentTable';
import { InventoryAdjustmentsProvider } from './InventoryAdjustmentsProvider';

import withInventoryAdjustments from './withInventoryAdjustments';

import { compose, transformTableStateToQuery } from '@bigcapital/webapp/utils';

/**
 * Inventory Adjustment List.
 */
function InventoryAdjustmentList({
  // #withInventoryAdjustments
  inventoryAdjustmentTableState,
}) {
  return (
    <InventoryAdjustmentsProvider query={transformTableStateToQuery(inventoryAdjustmentTableState)}>
      <DashboardPageContent>
        <DashboardContentTable>
          <InventoryAdjustmentTable />
        </DashboardContentTable>
      </DashboardPageContent>
    </InventoryAdjustmentsProvider>
  );
}

export default compose(
  withInventoryAdjustments(({ inventoryAdjustmentTableState }) => ({
    inventoryAdjustmentTableState,
  })),
)(InventoryAdjustmentList);
