// @ts-nocheck
import React from 'react';

const ItemDeleteAlert = React.lazy(() => import('@bigcapital/webapp/containers/Alerts/Items/ItemDeleteAlert'));

const ItemInactivateAlert = React.lazy(() => import('@bigcapital/webapp/containers/Alerts/Items/ItemInactivateAlert'));

const ItemActivateAlert = React.lazy(() => import('@bigcapital/webapp/containers/Alerts/Items/ItemActivateAlert'));

const ItemBulkDeleteAlert = React.lazy(() => import('@bigcapital/webapp/containers/Alerts/Items/ItemBulkDeleteAlert'));

const cancelUnlockingPartialAlert = React.lazy(
  () => import('@bigcapital/webapp/containers/Alerts/TransactionLocking/cancelUnlockingPartialAlert'),
);

/**
 * Items alert.
 */
export default [
  {
    name: 'item-delete',
    component: ItemDeleteAlert,
  },
  {
    name: 'item-inactivate',
    component: ItemInactivateAlert,
  },
  {
    name: 'item-activate',
    component: ItemActivateAlert,
  },
  {
    name: 'items-bulk-delete',
    component: ItemBulkDeleteAlert,
  },
];
