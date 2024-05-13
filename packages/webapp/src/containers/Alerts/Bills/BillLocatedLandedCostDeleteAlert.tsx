import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { useDeleteLandedCost } from '@bigcapital/webapp/hooks/query';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { AppToaster } from '@bigcapital/webapp/components';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

/**
 *  Bill transaction delete alert.
 */
function BillTransactionDeleteAlert({
  name,
  // #withAlertStoreConnect
  isOpen,
  payload: { BillId },
  // #withAlertActions
  closeAlert,
}) {
  const { mutateAsync: deleteLandedCostMutate, isLoading } = useDeleteLandedCost();

  // Handle cancel delete.
  const handleCancelAlert = () => {
    closeAlert(name);
  };

  // Handle confirm delete .
  const handleConfirmLandedCostDelete = () => {
    deleteLandedCostMutate(BillId)
      .then(() => {
        AppToaster.show({
          message: intl.get('landed_cost.action.delete.success_message'),
          intent: Intent.SUCCESS,
        });
        closeAlert(name);
      })
      .catch(() => {
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
      onCancel={handleCancelAlert}
      onConfirm={handleConfirmLandedCostDelete}
      loading={isLoading}
    >
      <p>
        <T id={`landed_cost.once_your_delete_this_located_landed_cost`} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(BillTransactionDeleteAlert);
