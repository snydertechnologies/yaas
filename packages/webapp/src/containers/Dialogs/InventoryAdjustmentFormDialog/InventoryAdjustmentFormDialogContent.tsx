// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/pages/Items/ItemAdjustmentDialog.scss';

import InventoryAdjustmentForm from './InventoryAdjustmentForm';
import { InventoryAdjustmentFormProvider } from './InventoryAdjustmentFormProvider';

/**
 * Inventory adjustment form dialog content.
 */
export default function InventoryAdjustmentFormDialogContent({
  // #ownProps
  dialogName,
  itemId,
}) {
  return (
    <InventoryAdjustmentFormProvider itemId={itemId} dialogName={dialogName}>
      <InventoryAdjustmentForm />
    </InventoryAdjustmentFormProvider>
  );
}
