import { AppToaster, FormattedHTMLMessage, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
import { useDeleteInventoryAdjustment } from '@bigcapital/webapp/hooks/query';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Inventory Adjustment delete alerts.
 */
function InventoryAdjustmentDeleteAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { inventoryId },

  // #withAlertActions
  closeAlert,

  // #withDrawerActions
  closeDrawer,
}) {
  const { mutateAsync: deleteInventoryAdjMutate, isLoading } = useDeleteInventoryAdjustment();

  // handle cancel delete alert.
  const handleCancelInventoryAdjustmentDelete = () => {
    closeAlert(name);
  };

  // Handle the confirm delete of the inventory adjustment transaction.
  const handleConfirmInventoryAdjustmentDelete = () => {
    deleteInventoryAdjMutate(inventoryId)
      .then(() => {
        AppToaster.show({
          message: intl.get('the_adjustment_transaction_has_been_deleted_successfully'),
          intent: Intent.SUCCESS,
        });
        closeDrawer(DRAWERS.INVENTORY_ADJUSTMENT_DETAILS);
      })
      .catch((errors) => {})
      .finally(() => {
        closeAlert(name);
      });
  };

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={<T id={'delete'} />}
      icon="trash"
      intent={Intent.DANGER}
      isOpen={isOpen}
      onCancel={handleCancelInventoryAdjustmentDelete}
      onConfirm={handleConfirmInventoryAdjustmentDelete}
      loading={isLoading}
    >
      <p>
        <FormattedHTMLMessage id={'once_delete_this_inventory_a_adjustment_you_will_able_to_restore_it'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions, withDrawerActions)(InventoryAdjustmentDeleteAlert);
