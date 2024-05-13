import { toggleSalesTaxLiabilitySummaryFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  toggleSalesTaxLiabilitySummaryFilterDrawer: (toggle) => dispatch(toggleSalesTaxLiabilitySummaryFilterDrawer(toggle)),
});

export default connect(null, mapDispatchToProps);
