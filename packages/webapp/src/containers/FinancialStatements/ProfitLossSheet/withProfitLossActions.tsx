import { toggleProfitLossFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => ({
  toggleProfitLossFilterDrawer: (toggle) => dispatch(toggleProfitLossFilterDrawer(toggle)),
});

export default connect(null, mapDispatchToProps);
