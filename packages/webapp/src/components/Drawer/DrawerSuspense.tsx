import { DrawerLoading } from '@bigcapital/webapp/components';
// @ts-nocheck
import React, { Suspense } from 'react';

/**
 * Loading content.
 */
function LoadingContent() {
  return <DrawerLoading loading={true} />;
}

export function DrawerSuspense({ children }) {
  return <Suspense fallback={<LoadingContent />}>{children}</Suspense>;
}
