import { Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { AppToaster, DataTable, TableSkeletonRows } from '@bigcapital/webapp/components';

import withAlertsActions from '@bigcapital/webapp/containers/Alert/withAlertActions';
import { useRolesContext } from './RolesListProvider';
import { ActionsMenu, useRolesTableColumns } from './components';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Roles data table.
 */
function RolesDataTable({
  // #withAlertsActions
  openAlert,
}) {
  // History context.
  const history = useHistory();

  // Retrieve roles table columns
  const columns = useRolesTableColumns();

  // Roles table context.
  const { roles, isRolesFetching, isRolesLoading } = useRolesContext();

  // handles delete the given role.
  const handleDeleteRole = ({ id, predefined }) => {
    if (predefined) {
      AppToaster.show({
        message: intl.get('roles.error.you_cannot_delete_predefined_roles'),
        intent: Intent.DANGER,
      });
    } else {
      openAlert('role-delete', { roleId: id });
    }
  };
  // Handles the edit of the given role.
  const handleEditRole = ({ id, predefined }) => {
    if (predefined) {
      AppToaster.show({
        message: intl.get('roles.error.you_cannot_edit_predefined_roles'),
        intent: Intent.DANGER,
      });
    } else {
      history.push(`/preferences/roles/${id}`);
    }
  };

  return (
    <RolesTable
      columns={columns}
      data={roles}
      loading={isRolesLoading}
      headerLoading={isRolesFetching}
      progressBarLoading={isRolesFetching}
      TableLoadingRenderer={TableSkeletonRows}
      ContextMenu={ActionsMenu}
      payload={{
        onDeleteRole: handleDeleteRole,
        onEditRole: handleEditRole,
      }}
    />
  );
}

const RolesTable = styled(DataTable)`
  .table .tr {
    min-height: 42px;
  }
`;

export default compose(withAlertsActions)(RolesDataTable);
