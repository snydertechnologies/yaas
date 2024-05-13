import { getPlanSelector } from '@bigcapital/webapp/store/plans/plans.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const mapStateToProps = (state, props) => {
    const getPlan = getPlanSelector();

    const mapped = {
      plan: getPlan(state, props),
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };
  return connect(mapStateToProps);
};
