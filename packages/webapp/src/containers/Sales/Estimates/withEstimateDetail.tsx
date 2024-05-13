import { getEstimateByIdFactory } from '@bigcapital/webapp/store/Estimate/estimates.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default () => {
  const getEstimateById = getEstimateByIdFactory();

  const mapStateToProps = (state, props) => ({
    estimate: getEstimateById(state, props),
  });
  return connect(mapStateToProps);
};
