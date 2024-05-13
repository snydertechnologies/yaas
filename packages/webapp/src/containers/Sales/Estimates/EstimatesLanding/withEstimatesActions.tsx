import { resetEstimatesTableState, setEstimatesTableState } from '@bigcapital/webapp/store/Estimate/estimates.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  setEstimatesTableState: (state) => dispatch(setEstimatesTableState(state)),
  resetEstimatesTableState: () => dispatch(resetEstimatesTableState()),
});

export default connect(null, mapDispatchToProps);
