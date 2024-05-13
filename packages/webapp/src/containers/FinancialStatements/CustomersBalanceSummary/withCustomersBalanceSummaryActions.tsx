import { toggleCustomersBalanceSummaryFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapActionsToProps = (dispatch) => ({
  toggleCustomerBalanceFilterDrawer: (toggle) => dispatch(toggleCustomersBalanceSummaryFilterDrawer(toggle)),
});

export default connect(null, mapActionsToProps);
