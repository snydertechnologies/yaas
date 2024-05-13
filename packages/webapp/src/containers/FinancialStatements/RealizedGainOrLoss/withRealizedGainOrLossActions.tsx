import { toggleRealizedGainOrLossFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  toggleRealizedGainOrLossFilterDrawer: (toggle) => dispatch(toggleRealizedGainOrLossFilterDrawer(toggle)),
});

export default connect(null, mapDispatchToProps);
