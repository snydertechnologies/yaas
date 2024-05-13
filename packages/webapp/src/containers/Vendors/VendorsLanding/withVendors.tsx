import {
  getVendorsTableStateFactory,
  vendorsTableStateChangedFactory,
} from '@bigcapital/webapp/store/vendors/vendors.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const getVendorsTableState = getVendorsTableStateFactory();
  const vendorsTableStateChanged = vendorsTableStateChangedFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      vendorsTableState: getVendorsTableState(state, props),
      vendorsTableStateChanged: vendorsTableStateChanged(state, props),
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };
  return connect(mapStateToProps);
};
