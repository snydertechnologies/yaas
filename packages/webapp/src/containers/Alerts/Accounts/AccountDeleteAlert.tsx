import { AppToaster, FormattedHTMLMessage, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { handleDeleteErrors } from '@bigcapital/webapp/containers/Accounts/utils';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { useDeleteAccount } from '@bigcapital/webapp/hooks/query';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Account delete alerts.
 */
function AccountDeleteAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { accountId },

  // #withAlertActions
  closeAlert,

  // #withDrawerActions
  closeDrawer,
}) {
  const { isLoading, mutateAsync: deleteAccount } = useDeleteAccount();

  // handle cancel delete account alert.
  const handleCancelAccountDelete = () => {
    closeAlert(name);
  };
  // Handle confirm account delete.
  const handleConfirmAccountDelete = () => {
    deleteAccount(accountId)
      .then(() => {
        AppToaster.show({
          message: intl.get('the_account_has_been_successfully_deleted'),
          intent: Intent.SUCCESS,
        });
        closeAlert(name);
        closeDrawer(DRAWERS.ACCOUNT_DETAILS);
      })
      .catch(
        ({
          response: {
            data: { errors },
          },
        }) => {
          handleDeleteErrors(errors);
          closeAlert(name);
        },
      );
  };

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={<T id={'delete'} />}
      icon="trash"
      intent={Intent.DANGER}
      isOpen={isOpen}
      onCancel={handleCancelAccountDelete}
      onConfirm={handleConfirmAccountDelete}
      loading={isLoading}
    >
      <p>
        <FormattedHTMLMessage id={'once_delete_this_account_you_will_able_to_restore_it'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions, withDrawerActions)(AccountDeleteAlert);
