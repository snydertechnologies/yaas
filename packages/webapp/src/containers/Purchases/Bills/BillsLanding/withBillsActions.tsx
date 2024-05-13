import { resetBillsTableState, setBillsTableState } from '@bigcapital/webapp/store/Bills/bills.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  setBillsTableState: (queries) => dispatch(setBillsTableState(queries)),
  resetBillsTableState: () => dispatch(resetBillsTableState()),
});

export default connect(null, mapDispatchToProps);
