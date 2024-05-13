// @ts-nocheck
import React from 'react';

const CurrencyDeleteAlert = React.lazy(
  () => import('@bigcapital/webapp/containers/Alerts/Currencies/CurrencyDeleteAlert'),
);
export default [{ name: 'currency-delete', component: CurrencyDeleteAlert }];
