import * as R from 'ramda';
// @ts-nocheck
import { useEffect } from 'react';

import { Box } from '@bigcapital/webapp/components';
import withSubscriptionPlansActions from '../../Subscriptions/withSubscriptionPlansActions';
import styles from './SetupSubscription.module.scss';
import { SubscriptionPlansSection } from './SubscriptionPlansSection';

/**
 * Subscription step of wizard setup.
 */
function SetupSubscription({
  // #withSubscriptionPlansActions
  initSubscriptionPlans,
}) {
  useEffect(() => {
    initSubscriptionPlans();
  }, [initSubscriptionPlans]);

  useEffect(() => {
    window.LemonSqueezy.Setup({
      eventHandler: (event) => {
        // Do whatever you want with this event data
        if (event.event === 'Checkout.Success') {
        }
      },
    });
  }, []);

  return (
    <Box className={styles.root}>
      <SubscriptionPlansSection />
    </Box>
  );
}

export default R.compose(withSubscriptionPlansActions)(SetupSubscription);
