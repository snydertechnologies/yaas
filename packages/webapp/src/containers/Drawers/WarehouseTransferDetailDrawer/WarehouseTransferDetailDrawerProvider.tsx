import { DrawerHeaderContent, DrawerLoading } from '@bigcapital/webapp/components';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { useWarehouseTransfer } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

const WarehouseTransferDetailDrawerContext = React.createContext();

/**
 * Warehouse transfer detail drawer provider.
 */
function WarehouseTransferDetailDrawerProvider({ warehouseTransferId, ...props }) {
  // Handle fetch warehouse transfer detail.
  const { data: warehouseTransfer, isLoading: isWarehouseTransferLoading } = useWarehouseTransfer(warehouseTransferId, {
    enabled: !!warehouseTransferId,
  });

  const provider = {
    warehouseTransfer,
    warehouseTransferId,
  };

  return (
    <DrawerLoading loading={isWarehouseTransferLoading}>
      <DrawerHeaderContent
        name={DRAWERS.WAREHOUSE_TRANSFER_DETAILS}
        title={intl.get('warehouse_transfer.drawer.title', {
          number: warehouseTransfer.transaction_number ? `(${warehouseTransfer.transaction_number})` : null,
        })}
      />
      <WarehouseTransferDetailDrawerContext.Provider value={provider} {...props} />
    </DrawerLoading>
  );
}

const useWarehouseDetailDrawerContext = () => React.useContext(WarehouseTransferDetailDrawerContext);

export { WarehouseTransferDetailDrawerProvider, useWarehouseDetailDrawerContext };
