import { includes } from 'lodash';
// @ts-nocheck
import React from 'react';

import withSubscriptions from '@bigcapital/webapp/containers/Subscriptions/withSubscriptions';
import { compose } from '@bigcapital/webapp/utils';
import { Redirect } from 'react-router-dom';

/**
 * Ensures the given subscription type is active or redirect to the given route.
 */
function EnsureSubscriptionIsActive({
  children,
  subscriptionType = 'main',
  redirectTo = '/billing',
  routePath,
  exclude,
  isSubscriptionActive,
}) {
  return isSubscriptionActive || includes(exclude, routePath) ? children : <Redirect to={{ pathname: redirectTo }} />;
}

export default compose(withSubscriptions(({ isSubscriptionActive }) => ({ isSubscriptionActive }), 'main'))(
  EnsureSubscriptionIsActive,
);
