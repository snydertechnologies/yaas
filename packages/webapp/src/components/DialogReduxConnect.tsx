import { getDialogPayloadFactory, isDialogOpenFactory } from '@bigcapital/webapp/store/dashboard/dashboard.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const isDialogOpen = isDialogOpenFactory();
  const getDialogPayload = getDialogPayloadFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      isOpen: isDialogOpen(state, props),
      payload: getDialogPayload(state, props),
    };
    return mapState ? mapState(mapped) : mapped;
  };
  return connect(mapStateToProps);
};
