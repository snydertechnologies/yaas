import { toggleTrialBalanceSheetFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => ({
  toggleTrialBalanceFilterDrawer: (toggle) => dispatch(toggleTrialBalanceSheetFilterDrawer(toggle)),
});

export default connect(null, mapDispatchToProps);
