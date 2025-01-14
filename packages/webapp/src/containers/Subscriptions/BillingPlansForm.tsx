import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/pages/Subscription/BillingPlans.scss';

import BillingPaymentMethod from './BillingPaymentMethod';
import BillingPeriodsInput from './BillingPeriodsInput';
import BillingPlansInput from './BillingPlansInput';

import withSubscriptions from './withSubscriptions';

/**
 * Billing plans form.
 */
export default function BillingPlansForm() {
  return (
    <div className="billing-plans">
      <BillingPlansInput />
      <BillingPeriodsInput />
      <BillingPaymentMethodWhenSubscriptionInactive />
    </div>
  );
}

/**
 * Billing payment methods when subscription is inactive.
 * @returns {JSX.Element}
 */
function BillingPaymentMethodWhenSubscriptionInactiveJSX({
  // # withSubscriptions
  isSubscriptionActive,

  ...props
}) {
  return !isSubscriptionActive ? <BillingPaymentMethod {...props} /> : null;
}

const BillingPaymentMethodWhenSubscriptionInactive = R.compose(
  withSubscriptions(({ isSubscriptionActive }) => ({ isSubscriptionActive })),
)(BillingPaymentMethodWhenSubscriptionInactiveJSX);
