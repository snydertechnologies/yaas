import { AppToaster, FormattedMessage as T } from '@bigcapital/webapp/components';
import { useInactivateUser } from '@bigcapital/webapp/hooks/query';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

/**
 * User inactivate alert.
 */
function UserInactivateAlert({
  // #ownProps
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { userId },

  // #withAlertActions
  closeAlert,
}) {
  const { mutateAsync: userInactivateMutate } = useInactivateUser();

  const handleConfirmInactivate = () => {
    userInactivateMutate(userId)
      .then(() => {
        AppToaster.show({
          message: intl.get('the_user_has_been_inactivated_successfully'),
          intent: Intent.SUCCESS,
        });
        closeAlert(name);
      })
      .catch(
        ({
          response: {
            data: { errors },
          },
        }) => {
          if (errors.find((e) => e.type === 'CANNOT.TOGGLE.ACTIVATE.AUTHORIZED.USER')) {
            AppToaster.show({
              message: 'You could not activate/inactivate the same authorized user.',
              intent: Intent.DANGER,
            });
          }
          closeAlert(name);
        },
      );
  };

  const handleCancel = () => {
    closeAlert(name);
  };

  return (
    <Alert
      cancelButtonText={<T id={'cancel'} />}
      confirmButtonText={<T id={'inactivate'} />}
      intent={Intent.WARNING}
      isOpen={isOpen}
      onCancel={handleCancel}
      onConfirm={handleConfirmInactivate}
    >
      <p>
        <T id={'are_sure_to_inactive_this_account'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(UserInactivateAlert);
