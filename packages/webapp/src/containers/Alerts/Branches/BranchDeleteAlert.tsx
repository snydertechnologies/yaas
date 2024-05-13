import { AppToaster, FormattedHTMLMessage, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { handleDeleteErrors } from '@bigcapital/webapp/containers/Preferences/Branches/utils';
import { useDeleteBranch } from '@bigcapital/webapp/hooks/query';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Branch delete alert.
 */
function BranchDeleteAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { branchId },

  // #withAlertActions
  closeAlert,
}) {
  const { mutateAsync: deleteBranch, isLoading } = useDeleteBranch();

  // Handle cancel delete alert.
  const handleCancelDelete = () => {
    closeAlert(name);
  };

  // Handle confirm delete branch.
  const handleConfirmDeleteBranch = () => {
    deleteBranch(branchId)
      .then(() => {
        AppToaster.show({
          message: intl.get('branch.alert.delete_message'),
          intent: Intent.SUCCESS,
        });
      })
      .catch(
        ({
          response: {
            data: { errors },
          },
        }) => {
          handleDeleteErrors(errors);
        },
      )
      .finally(() => {
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
      onCancel={handleCancelDelete}
      onConfirm={handleConfirmDeleteBranch}
      loading={isLoading}
    >
      <p>
        <FormattedHTMLMessage id={'branch.once_delete_this_branch'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(BranchDeleteAlert);
