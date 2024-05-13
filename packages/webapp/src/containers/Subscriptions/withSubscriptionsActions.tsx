import { fetchSubscriptions } from '@bigcapital/webapp/store/subscription/subscription.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  requestFetchSubscriptions: () => dispatch(fetchSubscriptions()),
});

export default connect(null, mapDispatchToProps);
