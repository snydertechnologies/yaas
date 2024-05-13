import {
  getEstimatesTableStateFactory,
  isEstimatesTableStateChangedFactory,
} from '@bigcapital/webapp/store/Estimate/estimates.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const getEstimatesTableState = getEstimatesTableStateFactory();
  const isEstimatesTableStateChanged = isEstimatesTableStateChangedFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      estimatesTableState: getEstimatesTableState(state, props),
      estimatesTableStateChanged: isEstimatesTableStateChanged(state, props),
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };
  return connect(mapStateToProps);
};
