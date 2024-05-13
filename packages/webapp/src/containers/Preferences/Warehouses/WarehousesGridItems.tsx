import { Intent } from '@blueprintjs/core';
import { ContextMenu2 } from '@blueprintjs/popover2';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { AppToaster } from '@bigcapital/webapp/components';
import { useMarkWarehouseAsPrimary } from '@bigcapital/webapp/hooks/query';
import { WarehouseContextMenu, WarehousesGridItemBox } from './components';

import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import { compose } from '@bigcapital/webapp/utils';

/**
 *  warehouse grid item.
 */
function WarehouseGridItem({
  // #withAlertsActions
  openAlert,

  // #withDialogActions
  openDialog,

  warehouse,
}) {
  const { mutateAsync: markWarehouseAsPrimaryMutate } = useMarkWarehouseAsPrimary();

  // Handle edit warehouse.
  const handleEditWarehouse = () => {
    openDialog('warehouse-form', { warehouseId: warehouse.id, action: 'edit' });
  };
  // Handle delete warehouse.
  const handleDeleteWarehouse = () => {
    openAlert('warehouse-delete', { warehouseId: warehouse.id });
  };
  // Handle mark primary warehouse.
  const handleMarkWarehouseAsPrimary = () => {
    markWarehouseAsPrimaryMutate(warehouse.id).then(() => {
      AppToaster.show({
        message: intl.get('warehouse.alert.mark_primary_message'),
        intent: Intent.SUCCESS,
      });
    });
  };

  return (
    <ContextMenu2
      content={
        <WarehouseContextMenu
          warehouse={warehouse}
          onEditClick={handleEditWarehouse}
          onDeleteClick={handleDeleteWarehouse}
          onMarkPrimary={handleMarkWarehouseAsPrimary}
        />
      }
    >
      <WarehousesGridItemBox
        title={warehouse.name}
        code={warehouse.code}
        city={warehouse.city}
        country={warehouse.country}
        email={warehouse.email}
        phoneNumber={warehouse.phone_number}
        primary={warehouse.primary}
      />
    </ContextMenu2>
  );
}

const WarehousesGridItem = compose(withAlertsActions, withDialogActions)(WarehouseGridItem);

/**
 * warehouses grid items,
 */
export default function WarehousesGridItems({ warehouses }) {
  return warehouses.map((warehouse) => <WarehousesGridItem warehouse={warehouse} />);
}
