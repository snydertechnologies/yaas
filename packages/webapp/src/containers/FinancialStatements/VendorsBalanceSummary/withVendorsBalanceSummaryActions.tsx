import { toggleVendorsBalanceSummaryFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapActionsToProps = (dispatch) => ({
  toggleVendorSummaryFilterDrawer: (toggle) => dispatch(toggleVendorsBalanceSummaryFilterDrawer(toggle)),
});

export default connect(null, mapActionsToProps);
