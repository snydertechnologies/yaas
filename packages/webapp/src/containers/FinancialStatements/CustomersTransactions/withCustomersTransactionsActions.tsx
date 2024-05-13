import { toggleCustomersTransactionsFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapActionsToProps = (dispatch) => ({
  toggleCustomersTransactionsFilterDrawer: (toggle) => dispatch(toggleCustomersTransactionsFilterDrawer(toggle)),
});

export default connect(null, mapActionsToProps);
