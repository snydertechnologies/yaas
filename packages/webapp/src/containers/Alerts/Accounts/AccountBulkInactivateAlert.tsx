import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { AppToaster } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React, { useState } from 'react';
import intl from 'react-intl-universal';
import { QueryCache } from 'react-query';

import withAccountsActions from '@bigcapital/webapp/containers/Accounts/withAccountsTableActions';
import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

function AccountBulkInactivateAlert({
  name,
  isOpen,
  payload: { accountsIds },

  // #withAccountsActions
  requestBulkInactiveAccounts,

  closeAlert,
}) {
  const [isLoading, setLoading] = useState(false);
  const selectedRowsCount = 0;

  // Handle alert cancel.
  const handleCancel = () => {
    closeAlert(name);
  };
  // Handle Bulk Inactive accounts confirm.
  const handleConfirmBulkInactive = () => {
    setLoading(true);
    requestBulkInactiveAccounts(accountsIds)
      .then(() => {
        AppToaster.show({
          message: intl.get('the_accounts_have_been_successfully_inactivated'),
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
      confirmButtonText={`${intl.get('inactivate')} (${selectedRowsCount})`}
      intent={Intent.WARNING}
      isOpen={isOpen}
      onCancel={handleCancel}
      onConfirm={handleConfirmBulkInactive}
      loading={isLoading}
    >
      <p>
        <T id={'are_sure_to_inactive_this_accounts'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions, withAccountsActions)(AccountBulkInactivateAlert);
