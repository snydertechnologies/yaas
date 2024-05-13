import {
  resetVendorCreditTableState,
  setVendorCreditTableState,
} from '@bigcapital/webapp/store/VendorCredit/vendorCredit.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  setVendorsCreditNoteTableState: (queries) => dispatch(setVendorCreditTableState(queries)),
  resetVendorsCreditNoteTableState: () => dispatch(resetVendorCreditTableState()),
});

export default connect(null, mapDispatchToProps);
