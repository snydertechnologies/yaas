import { toggleBalanceSheetFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  toggleBalanceSheetFilterDrawer: (toggle) => dispatch(toggleBalanceSheetFilterDrawer(toggle)),
});

export default connect(null, mapDispatchToProps);
