import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { AppToaster } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React, { useState } from 'react';
import intl from 'react-intl-universal';
import { QueryCache } from 'react-query';

import { handleDeleteErrors } from '@bigcapital/webapp/containers/Accounts/utils';

import withAccountsActions from '@bigcapital/webapp/containers/Accounts/withAccountsActions';
import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Account bulk delete alert.
 */
function AccountBulkDeleteAlert({
  // #ownProps
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { accountsIds },

  // #withAlertActions
  closeAlert,

  // #withAccountsActions
  requestDeleteBulkAccounts,
}) {
  const [isLoading, setLoading] = useState(false);

  const selectedRowsCount = 0;

  const handleCancel = () => {
    closeAlert(name);
  };
  // Handle confirm accounts bulk delete.
  const handleConfirmBulkDelete = () => {
    setLoading(true);
    requestDeleteBulkAccounts(accountsIds)
      .then(() => {
        AppToaster.show({
          message: intl.get('the_accounts_has_been_successfully_deleted'),
          intent: Intent.SUCCESS,
        });
        QueryCache.invalidateQueries('accounts-table');
      })
      .catch((errors) => {
        handleDeleteErrors(errors);
      })
      .finally(() => {
        setLoading(false);
        closeAlert(name);
      });
  };

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={`${intl.get('delete')} (${selectedRowsCount})`}
      icon="trash"
      intent={Intent.DANGER}
      isOpen={isOpen}
      onCancel={handleCancel}
      onConfirm={handleConfirmBulkDelete}
      loading={isLoading}
    >
      <p>
        <T id={'once_delete_these_accounts_you_will_not_able_restore_them'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions, withAccountsActions)(AccountBulkDeleteAlert);
