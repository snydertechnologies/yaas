import { resetCustomersTableState, setCustomersTableState } from '@bigcapital/webapp/store/customers/customers.actions';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => ({
  setCustomersTableState: (state) => dispatch(setCustomersTableState(state)),
  resetCustomersTableState: () => dispatch(resetCustomersTableState()),
});

export default connect(null, mapDispatchToProps);
