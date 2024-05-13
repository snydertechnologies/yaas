import { AppToaster, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { useMarkBranchAsPrimary } from '@bigcapital/webapp/hooks/query';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

/**
 * branch mark primary alert.
 */
function BranchMarkPrimaryAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { branchId },

  // #withAlertActions
  closeAlert,
}) {
  const { mutateAsync: markPrimaryBranchMutate, isLoading } = useMarkBranchAsPrimary();

  // Handle cancel mark primary alert.
  const handleCancelMarkPrimaryAlert = () => {
    closeAlert(name);
  };

  // andle cancel mark primary confirm.
  const handleConfirmMarkPrimaryBranch = () => {
    markPrimaryBranchMutate(branchId)
      .then(() => {
        AppToaster.show({
          message: intl.get('branch.alert.mark_primary_message'),
          intent: Intent.SUCCESS,
        });
        closeAlert(name);
      })
      .catch((error) => {
        closeAlert(name);
      });
  };

  return (
    <Alert
      // cancelButtonText={<T id={'cancel'} />}
      // confirmButtonText={<T id={'make_primary'} />}
      intent={Intent.WARNING}
      isOpen={isOpen}
      onCancel={handleCancelMarkPrimaryAlert}
      onConfirm={handleConfirmMarkPrimaryBranch}
      loading={isLoading}
    >
      <p>
        <T id={'branch.alert.are_you_sure_you_want_to_make'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(BranchMarkPrimaryAlert);
