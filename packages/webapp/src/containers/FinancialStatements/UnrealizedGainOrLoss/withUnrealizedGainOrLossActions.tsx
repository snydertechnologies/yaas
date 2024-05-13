import { toggleUnrealizedGainOrLossFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  toggleUnrealizedGainOrLossFilterDrawer: (toggle) => dispatch(toggleUnrealizedGainOrLossFilterDrawer(toggle)),
});

export default connect(null, mapDispatchToProps);
