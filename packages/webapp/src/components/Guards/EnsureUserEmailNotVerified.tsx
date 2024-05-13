import { useAuthUserVerified } from '@bigcapital/webapp/hooks/state';
import React, { useEffect } from 'react';

interface EnsureUserEmailNotVerifiedProps {
  children: React.ReactNode;
  redirectTo?: string;
}

/**
 * Higher Order Component to ensure that the user's email is not verified.
 * If the email is verified, redirects to the specified page.
 * TODO: Modernize this component to use react-router-dom for navigation later.
 */
export function EnsureUserEmailNotVerified({ children, redirectTo = '/' }: EnsureUserEmailNotVerifiedProps) {
  const isAuthVerified = useAuthUserVerified();

  useEffect(() => {
    // Check if the user's email is verified
    if (isAuthVerified) {
      // Directly manipulate the window location for redirection
      window.location.href = redirectTo;
      // upgrade to react-router-dom later when v6+
    }
  }, [isAuthVerified, redirectTo]);

  // Render children if no redirection is necessary
  return <>{children}</>;
}
