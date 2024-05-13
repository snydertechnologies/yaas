// @ts-nocheck
import React from 'react';

const AccountDeleteTransactionAlert = React.lazy(
  () => import('@bigcapital/webapp/containers/Alerts/CashFlow/AccountDeleteTransactionAlert'),
);

/**
 * Account transaction alert.
 */
export default [
  {
    name: 'account-transaction-delete',
    component: AccountDeleteTransactionAlert,
  },
];
