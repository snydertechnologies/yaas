// @ts-nocheck
import React from 'react';

const cancelUnlockingPartialAlert = React.lazy(
  () => import('@bigcapital/webapp/containers/Alerts/TransactionLocking/cancelUnlockingPartialAlert'),
);

/**
 * Transactions alerts.
 */
export default [
  {
    name: 'cancel-unlocking-partail',
    component: cancelUnlockingPartialAlert,
  },
];
