import { getAlertPayloadFactory, isAlertOpenFactory } from '@bigcapital/webapp/store/dashboard/dashboard.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const isAlertOpen = isAlertOpenFactory();
  const getAlertPayload = getAlertPayloadFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      isOpen: isAlertOpen(state, props),
      payload: getAlertPayload(state, props),
    };
    return mapState ? mapState(mapped) : mapped;
  };
  return connect(mapStateToProps);
};
