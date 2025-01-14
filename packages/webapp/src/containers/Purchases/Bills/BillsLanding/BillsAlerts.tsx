// @ts-nocheck
import React from 'react';

const BillOpenAlert = React.lazy(() => import('@bigcapital/webapp/containers/Alerts/Bills/BillOpenAlert'));
const BillDeleteAlert = React.lazy(() => import('@bigcapital/webapp/containers/Alerts/Bills/BillDeleteAlert'));

const BillLocatedLandedCostDeleteAlert = React.lazy(
  () => import('@bigcapital/webapp/containers/Alerts/Bills/BillLocatedLandedCostDeleteAlert'),
);

export default [
  { name: 'bill-delete', component: BillDeleteAlert },
  { name: 'bill-open', component: BillOpenAlert },
  {
    name: 'bill-located-cost-delete',
    component: BillLocatedLandedCostDeleteAlert,
  },
];
