// @ts-nocheck
import React from 'react';

const PaymentMadeDeleteAlert = React.lazy(
  () => import('@bigcapital/webapp/containers/Alerts/PaymentMades/PaymentMadeDeleteAlert'),
);

export default [{ name: 'payment-made-delete', component: PaymentMadeDeleteAlert }];
