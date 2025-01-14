import {
  isSubscriptionActiveFactory,
  isSubscriptionInactiveFactory,
  isSubscriptionOnTrialFactory,
} from '@bigcapital/webapp/store/subscription/subscription.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState, slug) => {
  const isSubscriptionOnTrial = isSubscriptionOnTrialFactory(slug);
  const isSubscriptionInactive = isSubscriptionInactiveFactory(slug);
  const isSubscriptionActive = isSubscriptionActiveFactory(slug);

  const mapStateToProps = (state, props) => {
    const mapped = {
      isSubscriptionOnTrial: isSubscriptionOnTrial(state, props),
      isSubscriptionInactive: isSubscriptionInactive(state, props),
      isSubscriptionActive: isSubscriptionActive(state, props),
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };
  return connect(mapStateToProps);
};
