import { SubscriptionPlans, T } from '@bigcapital/webapp/components';
import { Field } from 'formik';
// @ts-nocheck
import React from 'react';

import { compose } from '@bigcapital/webapp/utils';
import withPlans from './withPlans';

/**
 * Billing plans.
 */
function BillingPlans({ plans, title, description, selectedOption }) {
  return (
    <section className="billing-plans__section">
      <h1 className="title">
        <T id={'setup.plans.select_plan.title'} />
      </h1>
      <div className="description">
        <p className="paragraph">
          <T id={'setup.plans.select_plan.description'} />
        </p>
      </div>

      <Field name={'plan_slug'}>
        {({ form: { setFieldValue }, field: { value } }) => (
          <SubscriptionPlans
            plans={plans}
            value={value}
            onSelect={(value) => {
              setFieldValue('plan_slug', value);
            }}
          />
        )}
      </Field>
    </section>
  );
}
export default compose(withPlans(({ plans }) => ({ plans })))(BillingPlans);
