import { DashboardInsider } from '@bigcapital/webapp/components/Dashboard';
import { useInventoryAdjustments } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React, { createContext } from 'react';

const InventoryAdjustmentsContext = createContext();

/**
 * Accounts chart data provider.
 */
function InventoryAdjustmentsProvider({ query, ...props }) {
  // Handles the inventory adjustments fethcing of the given query.
  const {
    isLoading: isAdjustmentsLoading,
    isFetching: isAdjustmentsFetching,
    data: { transactions: inventoryAdjustments, pagination },
  } = useInventoryAdjustments(query, { keepPreviousData: true });

  // Provider payload.
  const provider = {
    inventoryAdjustments,
    isAdjustmentsLoading,
    isAdjustmentsFetching,
    pagination,
  };

  return (
    <DashboardInsider loading={isAdjustmentsLoading} name={'inventory_adjustments'}>
      <InventoryAdjustmentsContext.Provider value={provider} {...props} />
    </DashboardInsider>
  );
}

const useInventoryAdjustmentsContext = () => React.useContext(InventoryAdjustmentsContext);

export { InventoryAdjustmentsProvider, useInventoryAdjustmentsContext };
