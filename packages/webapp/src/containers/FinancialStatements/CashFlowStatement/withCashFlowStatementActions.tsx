import { toggleCashFlowStatementFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  toggleCashFlowStatementFilterDrawer: (toggle) => dispatch(toggleCashFlowStatementFilterDrawer(toggle)),
});

export default connect(null, mapDispatchToProps);
