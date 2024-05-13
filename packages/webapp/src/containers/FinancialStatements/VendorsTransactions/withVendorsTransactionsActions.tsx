import { toggleVendorsTransactionsFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapActionsToProps = (dispatch) => ({
  toggleVendorsTransactionsFilterDrawer: (toggle) => dispatch(toggleVendorsTransactionsFilterDrawer(toggle)),
});

export default connect(null, mapActionsToProps);
