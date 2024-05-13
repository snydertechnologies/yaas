import { getDrawerPayloadFactory, isDrawerOpenFactory } from '@bigcapital/webapp/store/dashboard/dashboard.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const isDrawerOpen = isDrawerOpenFactory();
  const getDrawerPayload = getDrawerPayloadFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      isOpen: isDrawerOpen(state, props),
      payload: getDrawerPayload(state, props),
    };
    return mapState ? mapState(mapped) : mapped;
  };
  return connect(mapStateToProps);
};
