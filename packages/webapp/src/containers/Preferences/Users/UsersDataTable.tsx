// @ts-nocheck
import React, { useCallback } from 'react';

import { AppToaster, DataTable, TableSkeletonRows } from '@bigcapital/webapp/components';
import { useResendInvitation } from '@bigcapital/webapp/hooks/query';
import { compose } from '@bigcapital/webapp/utils';

import withAlertActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';

import { Intent } from '@blueprintjs/core';
import { useUsersListContext } from './UsersProvider';
import { ActionsMenu, useUsersListColumns } from './components';

/**
 * Users datatable.
 */
function UsersDataTable({
  // #withDialogActions
  openDialog,

  // #withAlertActions
  openAlert,
}) {
  const { mutateAsync: resendInviation } = useResendInvitation();

  // Users list columns.
  const columns = useUsersListColumns();

  // Users list context.
  const { users, isUsersLoading, isUsersFetching } = useUsersListContext();

  // Handle edit user action.
  const handleEditUserAction = useCallback(
    (user) => {
      openDialog('user-form', { action: 'edit', userId: user.id });
    },
    [openDialog],
  );
  // Handle inactivate user action.
  const handleInactivateUser = useCallback(
    (user) => {
      openAlert('user-inactivate', { userId: user.id });
    },
    [openAlert],
  );
  // Handle activate user action.
  const handleActivateuser = useCallback(
    (user) => {
      openAlert('user-activate', { userId: user.id });
    },
    [openAlert],
  );
  // Handle delete user action.
  const handleDeleteUser = useCallback(
    (user) => {
      openAlert('user-delete', { userId: user.id });
    },
    [openAlert],
  );
  const handleResendInvitation = useCallback((user) => {
    resendInviation(user.id)
      .then(() => {
        AppToaster.show({
          message: 'User invitation has been re-sent to the user.',
          intent: Intent.SUCCESS,
        });
      })
      .catch(
        ({
          response: {
            data: { errors },
          },
        }) => {
          if (errors.find((e) => e.type === 'USER_RECENTLY_INVITED')) {
            AppToaster.show({
              message: 'This person was recently invited. No need to invite them again just yet.',
              intent: Intent.WARNING,
            });
          }
        },
      );
  });

  return (
    <DataTable
      columns={columns}
      data={users}
      loading={isUsersLoading}
      headerLoading={isUsersLoading}
      progressBarLoading={isUsersFetching}
      TableLoadingRenderer={TableSkeletonRows}
      noInitialFetch={true}
      ContextMenu={ActionsMenu}
      payload={{
        onEdit: handleEditUserAction,
        onActivate: handleActivateuser,
        onInactivate: handleInactivateUser,
        onDelete: handleDeleteUser,
        onResendInvitation: handleResendInvitation,
      }}
    />
  );
}

export default compose(withDialogActions, withAlertActions)(UsersDataTable);
