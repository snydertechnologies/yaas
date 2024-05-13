import {
  customersTableStateChangedFactory,
  getCustomersTableStateFactory,
} from '@bigcapital/webapp/store/customers/customers.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const getCustomersTableState = getCustomersTableStateFactory();
  const customersTableStateChanged = customersTableStateChangedFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      customersTableState: getCustomersTableState(state, props),
      customersTableStateChanged: customersTableStateChanged(state, props),
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };
  return connect(mapStateToProps);
};
