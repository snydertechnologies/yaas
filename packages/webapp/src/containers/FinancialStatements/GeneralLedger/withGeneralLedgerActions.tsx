import { toggleGeneralLedgerFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  toggleGeneralLedgerFilterDrawer: (toggle) => dispatch(toggleGeneralLedgerFilterDrawer(toggle)),
});

export default connect(null, mapDispatchToProps);
