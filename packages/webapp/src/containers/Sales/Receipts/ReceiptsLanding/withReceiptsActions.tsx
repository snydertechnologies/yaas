import { resetReceiptsTableState, setReceiptsTableState } from '@bigcapital/webapp/store/receipts/receipts.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  setReceiptsTableState: (queries) => dispatch(setReceiptsTableState(queries)),
  resetReceiptsTableState: () => dispatch(resetReceiptsTableState()),
});

export default connect(null, mapDispatchToProps);
