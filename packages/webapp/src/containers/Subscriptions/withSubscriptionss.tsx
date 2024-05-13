import {
  isSubscriptionsActiveFactory,
  isSubscriptionsInactiveFactory,
} from '@bigcapital/webapp/store/subscription/subscription.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const isSubscriptionsInactive = isSubscriptionsInactiveFactory();
  const isSubscriptionsActive = isSubscriptionsActiveFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      isSubscriptionsInactive: isSubscriptionsInactive(state, props),
      isSubscriptionsActive: isSubscriptionsActive(state, props),
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };
  return connect(mapStateToProps);
};
