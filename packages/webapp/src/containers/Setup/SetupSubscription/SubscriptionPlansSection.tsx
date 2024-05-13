// @ts-nocheck
import { T } from '@bigcapital/webapp/components';

import { compose } from '@bigcapital/webapp/utils';
import { Callout, Intent } from '@blueprintjs/core';
import withPlans from '../../Subscriptions/withPlans';
import { SubscriptionPlans } from './SubscriptionPlan';

/**
 * Billing plans.
 */
function SubscriptionPlansSectionRoot({ plans }) {
  return (
    <section>
      <Callout style={{ marginBottom: '1.5rem' }} icon={null} title={'Early Adaptors Plan'}>
        We're looking for 200 early adaptors, when you subscribe you'll get the full features and unlimited users for a
        year regardless of the subscribed plan.
      </Callout>
      <SubscriptionPlans plans={plans} />
    </section>
  );
}

export const SubscriptionPlansSection = compose(withPlans(({ plans }) => ({ plans })))(SubscriptionPlansSectionRoot);
