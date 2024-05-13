import { AppToaster, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { useCancelUnlockingPartialTransactions } from '@bigcapital/webapp/hooks/query';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Cancel Unlocking partial transactions alerts.
 */
function CancelUnlockingPartialTarnsactions({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { module },

  // #withAlertActions
  closeAlert,
}) {
  const { mutateAsync: cancelUnlockingPartial, isLoading } = useCancelUnlockingPartialTransactions();

  // Handle cancel.
  const handleCancel = () => {
    closeAlert(name);
  };

  // Handle confirm.
  const handleConfirm = () => {
    const values = {
      module: module,
    };
    cancelUnlockingPartial(values)
      .then(() => {
        AppToaster.show({
          message: intl.get('unlocking_partial_transactions.alert.cancel_message'),
          intent: Intent.SUCCESS,
        });
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
      confirmButtonText={<T id={'yes'} />}
      intent={Intent.DANGER}
      isOpen={isOpen}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      loading={isLoading}
    >
      <p>
        <T id={'unlocking_partial_transactions.alert.message'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(CancelUnlockingPartialTarnsactions);
