import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { AppToaster } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { useUncategorizeTransaction } from '@bigcapital/webapp/hooks/query';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Project delete alert.
 */
function UncategorizeTransactionAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { uncategorizedTransactionId },

  // #withAlertActions
  closeAlert,

  // #withDrawerActions
  closeDrawer,
}) {
  const { mutateAsync: uncategorizeTransaction, isLoading } = useUncategorizeTransaction();

  // handle cancel delete project alert.
  const handleCancelDeleteAlert = () => {
    closeAlert(name);
  };

  // handleConfirm delete project
  const handleConfirmBtnClick = () => {
    uncategorizeTransaction(uncategorizedTransactionId)
      .then(() => {
        AppToaster.show({
          message: 'The transaction has uncategorized successfully.',
          intent: Intent.SUCCESS,
        });
        closeAlert(name);
        closeDrawer(DRAWERS.CASHFLOW_TRNASACTION_DETAILS);
      })
      .catch(
        ({
          response: {
            data: { errors },
          },
        }) => {
          AppToaster.show({
            message: 'Something went wrong.',
            intent: Intent.DANGER,
          });
        },
      );
  };

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={'Uncategorize'}
      intent={Intent.WARNING}
      isOpen={isOpen}
      onCancel={handleCancelDeleteAlert}
      onConfirm={handleConfirmBtnClick}
      loading={isLoading}
    >
      <p>Are you sure want to uncategorize the transaction?</p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions, withDrawerActions)(UncategorizeTransactionAlert);
