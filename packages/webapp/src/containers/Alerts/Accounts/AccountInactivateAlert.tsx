import { AppToaster, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { useInactivateAccount } from '@bigcapital/webapp/hooks/query';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Account inactivate alert.
 */
function AccountInactivateAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { accountId },

  // #withAlertActions
  closeAlert,
}) {
  const { mutateAsync: inactivateAccount, isLoading } = useInactivateAccount();

  const handleCancelInactiveAccount = () => {
    closeAlert('account-inactivate');
  };

  const handleConfirmAccountActive = () => {
    inactivateAccount(accountId)
      .then(() => {
        AppToaster.show({
          message: intl.get('the_account_has_been_successfully_inactivated'),
          intent: Intent.SUCCESS,
        });
      })
      .catch(() => {})
      .finally(() => {
        closeAlert('account-inactivate');
      });
  };

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={<T id={'inactivate'} />}
      intent={Intent.WARNING}
      isOpen={isOpen}
      onCancel={handleCancelInactiveAccount}
      onConfirm={handleConfirmAccountActive}
      loading={isLoading}
    >
      <p>
        <T id={'are_sure_to_inactive_this_account'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(AccountInactivateAlert);
