import { DialogContent } from '@bigcapital/webapp/components';
import { useCreateInviteUser, useRoles, useUsers } from '@bigcapital/webapp/hooks/query';
// @ts-nocheck
import React, { createContext } from 'react';

const InviteUserFormContext = createContext();

/**
 * Invite user Form page provider.
 */
function InviteUserFormProvider({ userId, isEditMode, dialogName, ...props }) {
  // Create and edit item currency mutations.
  const { mutateAsync: inviteUserMutate } = useCreateInviteUser();

  // fetch users list.
  const { isLoading: isUsersLoading } = useUsers();

  // fetch roles list.
  const { data: roles, isLoading: isRolesLoading } = useRoles();

  // Provider state.
  const provider = {
    inviteUserMutate,
    dialogName,
    userId,
    isUsersLoading,
    isEditMode,
    roles,
  };

  return (
    <DialogContent isLoading={isUsersLoading || isRolesLoading} name={'invite-form'}>
      <InviteUserFormContext.Provider value={provider} {...props} />
    </DialogContent>
  );
}

const useInviteUserFormContext = () => React.useContext(InviteUserFormContext);

export { InviteUserFormProvider, useInviteUserFormContext };
