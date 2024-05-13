import { AppToaster, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React, { useState } from 'react';
import intl from 'react-intl-universal';
import { QueryCache } from 'react-query';

import withAccountsActions from '@bigcapital/webapp/containers/Accounts/withAccountsActions';
import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

function AccountBulkActivateAlert({
  name,
  isOpen,
  payload: { accountsIds },

  // #withAlertActions
  closeAlert,

  requestBulkActivateAccounts,
}) {
  const [isLoading, setLoading] = useState(false);
  const selectedRowsCount = 0;

  // Handle alert cancel.
  const handleClose = () => {
    closeAlert(name);
  };

  // Handle Bulk activate account confirm.
  const handleConfirmBulkActivate = () => {
    setLoading(true);
    requestBulkActivateAccounts(accountsIds)
      .then(() => {
        AppToaster.show({
          message: intl.get('the_accounts_has_been_successfully_activated'),
          intent: Intent.SUCCESS,
        });
        QueryCache.invalidateQueries('accounts-table');
      })
      .catch((errors) => {})
      .finally(() => {
        setLoading(false);
        closeAlert(name);
      });
  };

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={`${intl.get('activate')} (${selectedRowsCount})`}
      intent={Intent.WARNING}
      isOpen={isOpen}
      onCancel={handleClose}
      onConfirm={handleConfirmBulkActivate}
      loading={isLoading}
    >
      <p>
        <T id={'are_sure_to_activate_this_accounts'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions, withAccountsActions)(AccountBulkActivateAlert);
