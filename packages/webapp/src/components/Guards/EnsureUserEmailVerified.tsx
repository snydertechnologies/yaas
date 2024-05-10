import { useAuthUserVerified } from '@/hooks/state';
import React, { useEffect } from 'react';

interface EnsureUserEmailVerifiedProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Higher Order Component to ensure that the user's email is verified.
 * If not verified, redirects to the email verification page.
 * TODO: Modernize this component to use react-router-dom for navigation later.
 */
export function EnsureUserEmailVerified({
  children,
  redirectTo = '/auth/register/verify',
}: EnsureUserEmailVerifiedProps) {
  const isAuthVerified = useAuthUserVerified();

  useEffect(() => {
    if (!isAuthVerified) {
      // Directly manipulate the window location for redirection
      window.location.href = redirectTo;
      // upgrade to react-router-dom later when v6+
    }
  }, [isAuthVerified, redirectTo]);

  // Render children if no redirection is necessary
  return <>{children}</>;
}
