import { AppToaster, FormattedHTMLMessage, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Alert, Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import { handleDeleteErrors } from '@bigcapital/webapp/containers/Preferences/Users/Roles/utils';
import { useDeleteRole } from '@bigcapital/webapp/hooks/query';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withAlertStoreConnect from '@bigcapital/webapp/containers/Alert/withAlertStoreConnect';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Role delete alert.
 */
function RoleDeleteAlert({
  name,

  // #withAlertStoreConnect
  isOpen,
  payload: { roleId },

  // #withAlertActions
  closeAlert,
}) {
  const { mutateAsync: deleteRole, isLoading } = useDeleteRole();

  // Handle cancel delete role alert.
  const handleCancelDelete = () => {
    closeAlert(name);
  };

  // Handle confirm delete role.
  const handleConfirmDeleteRole = () => {
    deleteRole(roleId)
      .then(() => {
        AppToaster.show({
          message: intl.get('roles.permission_schema.delete.alert_message'),
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
      onConfirm={handleConfirmDeleteRole}
      loading={isLoading}
    >
      <p>
        <FormattedHTMLMessage id={'roles.permission_schema.once_delete_this_role_you_will_able_to_restore_it'} />
      </p>
    </Alert>
  );
}

export default compose(withAlertStoreConnect(), withAlertActions)(RoleDeleteAlert);
