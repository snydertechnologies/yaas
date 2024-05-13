// @ts-nocheck
import LazyLoader from '@bigcapital/webapp/components/LazyLoader';

const BASE_URL = '/auth';

export default [
  {
    path: `${BASE_URL}/login`,
    component: LazyLoader({
      loader: () => import('@bigcapital/webapp/containers/Authentication/Login'),
    }),
  },
  {
    path: `${BASE_URL}/send_reset_password`,
    component: LazyLoader({
      loader: () => import('@bigcapital/webapp/containers/Authentication/SendResetPassword'),
    }),
  },
  {
    path: `${BASE_URL}/reset_password/:token`,
    component: LazyLoader({
      loader: () => import('@bigcapital/webapp/containers/Authentication/ResetPassword'),
    }),
  },
  {
    path: `${BASE_URL}/invite/:token/accept`,
    component: LazyLoader({
      loader: () => import('@bigcapital/webapp/containers/Authentication/InviteAccept'),
    }),
  },
  {
    path: `${BASE_URL}/register/email_confirmation`,
    component: LazyLoader({
      loader: () => import('@bigcapital/webapp/containers/Authentication/EmailConfirmation'),
    }),
  },
  {
    path: `${BASE_URL}/register`,
    component: LazyLoader({
      loader: () => import('@bigcapital/webapp/containers/Authentication/Register'),
    }),
  },
];
