import { AppToaster, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { useTransferredWarehouseTransfer } from '@bigcapital/webapp/hooks/query';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

/**
 * warehouse transfer transferred alert.
 * @returns
 */
function TransferredWarehouseTransferAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { warehouseTransferId },

  // #withAlertActions
  closeAlert,
}) {
  const { mutateAsync: transferredWarehouseTransferMutate, isLoading } = useTransferredWarehouseTransfer();

  // handle cancel alert.
  const handleCancelAlert = () => {
    closeAlert(name);
  };

  // Handle confirm alert.
  const handleConfirmTransferred = () => {
    transferredWarehouseTransferMutate(warehouseTransferId)
      .then(() => {
        AppToaster.show({
          message: intl.get('warehouse_transfer.alert.transferred_warehouse'),
          intent: Intent.SUCCESS,
        });
      })
      .catch((error) => {})
      .finally(() => {
        closeAlert(name);
      });
  };

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={<T id={'deliver'} />}
      intent={Intent.WARNING}
      isOpen={isOpen}
      onCancel={handleCancelAlert}
      onConfirm={handleConfirmTransferred}
      loading={isLoading}
    >
      <p>
        <T id={'warehouse_transfer.alert.are_you_sure_you_want_to_deliver'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(TransferredWarehouseTransferAlert);
