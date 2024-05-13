import { CLASSES } from '@bigcapital/webapp/constants/classes';
import { useRoles } from '@bigcapital/webapp/hooks/query';
import classNames from 'classnames';
// @ts-nocheck
import React from 'react';

const RolesListContext = React.createContext();

/**
 * Roles list provider.
 */
function RolesListProvider({ ...props }) {
  // Fetch roles list.
  const { data: roles, isFetching: isRolesFetching, isLoading: isRolesLoading } = useRoles();

  // Provider state.
  const provider = {
    roles,
    isRolesFetching,
    isRolesLoading,
  };
  return (
    <div className={classNames(CLASSES.PREFERENCES_PAGE_INSIDE_CONTENT, CLASSES.PREFERENCES_PAGE_INSIDE_CONTENT_USERS)}>
      <RolesListContext.Provider value={provider} {...props} />
    </div>
  );
}

const useRolesContext = () => React.useContext(RolesListContext);

export { RolesListProvider, useRolesContext };
