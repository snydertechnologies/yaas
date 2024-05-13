import { resetVendorsTableState, setVendorsTableState } from '@bigcapital/webapp/store/vendors/vendors.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  setVendorsTableState: (queries) => dispatch(setVendorsTableState(queries)),
  resetVendorsTableState: () => dispatch(resetVendorsTableState()),
});

export default connect(null, mapDispatchToProps);
