import { AppToaster, FormattedHTMLMessage, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { handleDeleteErrors } from '@bigcapital/webapp/containers/Preferences/Warehouses/utils';
import { useDeleteWarehouse } from '@bigcapital/webapp/hooks/query';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Warehouse delete alert
 * @returns
 */
function WarehouseDeleteAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { warehouseId },

  // #withAlertActions
  closeAlert,
}) {
  const { mutateAsync: deleteWarehouseMutate, isLoading } = useDeleteWarehouse();

  // handle cancel delete warehouse alert.
  const handleCancelDeleteAlert = () => {
    closeAlert(name);
  };

  // handleConfirm delete invoice
  const handleConfirmWarehouseDelete = () => {
    deleteWarehouseMutate(warehouseId)
      .then(() => {
        AppToaster.show({
          message: intl.get('warehouse.alert.delete_message'),
          intent: Intent.SUCCESS,
        });
      })
      .catch(
        ({
          response: {
            data: { errors },
          },
        }) => {
          handleDeleteErrors(errors);
        },
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
      onConfirm={handleConfirmWarehouseDelete}
      loading={isLoading}
    >
      <p>
        <FormattedHTMLMessage id={'warehouse.once_delete_this_warehouse'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(WarehouseDeleteAlert);
