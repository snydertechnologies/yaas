import { DrawerHeaderContent, DrawerLoading } from '@bigcapital/webapp/components';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { useInventoryAdjustment } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

const InventoryAdjustmentDrawerContext = React.createContext();

/**
 * Inventory adjustment drawer provider.
 */
function InventoryAdjustmentDrawerProvider({ inventoryId, ...props }) {
  // Handle fetch inventory adjustment .
  const { data: inventoryAdjustment, isLoading: isAdjustmentsLoading } = useInventoryAdjustment(inventoryId, {
    enabled: !!inventoryId,
  });

  //provider.
  const provider = {
    inventoryAdjustment,
    inventoryId,
  };

  return (
    <DrawerLoading loading={isAdjustmentsLoading}>
      <DrawerHeaderContent
        name={DRAWERS.INVENTORY_ADJUSTMENT_DETAILS}
        title={intl.get('inventory_adjustment.details_drawer.title')}
      />
      <InventoryAdjustmentDrawerContext.Provider value={provider} {...props} />
    </DrawerLoading>
  );
}

const useInventoryAdjustmentDrawerContext = () => React.useContext(InventoryAdjustmentDrawerContext);

export { InventoryAdjustmentDrawerProvider, useInventoryAdjustmentDrawerContext };
