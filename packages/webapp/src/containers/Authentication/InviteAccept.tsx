import AuthInsider from '@bigcapital/webapp/containers/Authentication/AuthInsider';
// @ts-nocheck
import React from 'react';
import { useParams } from 'react-router-dom';
import InviteAcceptForm from './InviteAcceptForm';
import { InviteAcceptProvider } from './InviteAcceptProvider';

/**
 * Authentication invite page.
 */
export default function Invite() {
  const { token } = useParams();

  return (
    <AuthInsider>
      <InviteAcceptProvider token={token}>
        <InviteAcceptForm />
      </InviteAcceptProvider>
    </AuthInsider>
  );
}
