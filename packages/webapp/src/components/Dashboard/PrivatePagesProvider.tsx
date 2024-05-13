import { useApplicationBoot } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';

/**
 * Private pages provider.
 */
export function PrivatePagesProvider({
  // #ownProps
  children,
}) {
  const { isLoading } = useApplicationBoot();

  return <React.Fragment>{!isLoading ? children : null}</React.Fragment>;
}
