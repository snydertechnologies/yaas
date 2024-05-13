import {
  resetVendorCreditTableState,
  setVendorCreditTableState,
} from '@bigcapital/webapp/store/VendorCredit/vendorCredit.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDipatchToProps = (dispatch) => ({
  setVendorCreditsTableState: (queries) => dispatch(setVendorCreditTableState(queries)),
  resetVendorCreditsTableState: () => dispatch(resetVendorCreditTableState()),
});

export default connect(null, mapDipatchToProps);
