import { useIsAuthenticated } from '@bigcapital/webapp/hooks/state';
// @ts-nocheck
import React from 'react';
import { Redirect } from 'react-router-dom';

interface EnsureAuthenticatedProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function EnsureAuthenticated({ children, redirectTo = '/auth/login' }: EnsureAuthenticatedProps) {
  const isAuthenticated = useIsAuthenticated();

  return isAuthenticated ? <>{children}</> : <Redirect to={{ pathname: redirectTo }} />;
}
