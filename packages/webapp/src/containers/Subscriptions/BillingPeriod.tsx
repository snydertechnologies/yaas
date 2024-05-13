import classNames from 'classnames';
import { get } from 'lodash';
// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/pages/Subscription/PlanPeriodRadio.scss';

import withPlan from '@bigcapital/webapp/containers/Subscriptions/withPlan';

import { compose, saveInvoke } from '@bigcapital/webapp/utils';

/**
 * Billing period.
 */
function BillingPeriod({
  // #ownProps
  label,
  value,
  selectedOption,
  onSelected,
  period,

  // #withPlan
  price,
  currencyCode,
}) {
  const handlePeriodClick = () => {
    saveInvoke(onSelected, value);
  };
  return (
    <div
      id={`plan-period-${period}`}
      className={classNames(
        {
          'is-selected': value === selectedOption,
        },
        'period-radio',
      )}
      onClick={handlePeriodClick}
    >
      <span className={'period-radio__label'}>{label}</span>

      <div className={'period-radio__price'}>
        <span className={'period-radio__amount'}>
          {price} {currencyCode}
        </span>
        <span className={'period-radio__period'}>{label}</span>
      </div>
    </div>
  );
}

export default compose(
  withPlan(({ plan }, state, { period }) => ({
    price: get(plan, `price.${period}`),
    currencyCode: get(plan, 'currencyCode'),
  })),
)(BillingPeriod);
