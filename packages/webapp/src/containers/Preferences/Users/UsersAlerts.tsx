// @ts-nocheck
import React from 'react';

const UserDeleteAlert = React.lazy(() => import('@bigcapital/webapp/containers/Alerts/Users/UserDeleteAlert'));
const UserActivateAlert = React.lazy(() => import('@bigcapital/webapp/containers/Alerts/Users/UserActivateAlert'));
const UserInactivateAlert = React.lazy(() => import('@bigcapital/webapp/containers/Alerts/Users/UserInactivateAlert'));

export default [
  { name: 'user-delete', component: UserDeleteAlert },
  { name: 'user-activate', component: UserActivateAlert },
  { name: 'user-inactivate', component: UserInactivateAlert },
];
