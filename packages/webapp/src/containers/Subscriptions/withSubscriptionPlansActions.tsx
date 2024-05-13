import { initSubscriptionPlans } from '@bigcapital/webapp/store/plans/plans.actions';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => ({
  initSubscriptionPlans: () => dispatch(initSubscriptionPlans()),
});

export default connect(null, mapDispatchToProps);
