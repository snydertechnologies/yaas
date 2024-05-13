import { AppToaster, FormattedHTMLMessage, FormattedMessage as T } from '@bigcapital/webapp/components';
import { useDeleteWarehouseTransfer } from '@bigcapital/webapp/hooks/query';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Warehouse transfer delete alert
 * @returns
 */
function WarehouseTransferDeleteAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { warehouseTransferId },

  // #withAlertActions
  closeAlert,

  // #withDrawerActions
  closeDrawer,
}) {
  const { mutateAsync: deleteWarehouseTransferMutate, isLoading } = useDeleteWarehouseTransfer();

  // handle cancel delete warehouse alert.
  const handleCancelDeleteAlert = () => {
    closeAlert(name);
  };

  // handleConfirm delete warehouse transfer.
  const handleConfirmWarehouseTransferDelete = () => {
    deleteWarehouseTransferMutate(warehouseTransferId)
      .then(() => {
        AppToaster.show({
          message: intl.get('warehouse_transfer.alert.delete_message'),
          intent: Intent.SUCCESS,
        });
        closeDrawer(DRAWERS.WAREHOUSE_TRANSFER_DETAILS);
      })
      .catch(
        ({
          response: {
            data: { errors },
          },
        }) => {},
      )
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
      onCancel={handleCancelDeleteAlert}
      onConfirm={handleConfirmWarehouseTransferDelete}
      loading={isLoading}
    >
      <p>
        <FormattedHTMLMessage id={'warehouse_transfer.once_delete_this_warehouse_transfer'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions, withDrawerActions)(WarehouseTransferDeleteAlert);
