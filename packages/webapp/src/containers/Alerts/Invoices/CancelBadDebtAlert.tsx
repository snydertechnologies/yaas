import { AppToaster, FormattedMessage as T } from '@bigcapital/webapp/components';
import { useCancelBadDebt } from '@bigcapital/webapp/hooks/query';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Cancel bad debt alert.
 */
function CancelBadDebtAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { invoiceId },

  // #withAlertActions
  closeAlert,
}) {
  // handle cancel  alert.
  const handleCancel = () => {
    closeAlert(name);
  };

  const { mutateAsync: cancelBadDebtMutate, isLoading } = useCancelBadDebt();

  // handleConfirm alert.
  const handleConfirm = () => {
    cancelBadDebtMutate(invoiceId)
      .then(() => {
        AppToaster.show({
          message: intl.get('bad_debt.cancel_alert.success_message'),
          intent: Intent.SUCCESS,
        });
      })
      .catch(() => {})
      .finally(() => {
        closeAlert(name);
      });
  };

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={<T id={'save'} />}
      intent={Intent.WARNING}
      isOpen={isOpen}
      onCancel={handleCancel}
      onConfirm={handleConfirm}
      loading={isLoading}
    >
      <p>
        <T id={'bad_debt.cancel_alert.message'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(CancelBadDebtAlert);
