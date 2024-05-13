import { toggleProjectProfitabilitySummaryFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  toggleProjectProfitabilitySummaryFilterDrawer: (toggle) =>
    dispatch(toggleProjectProfitabilitySummaryFilterDrawer(toggle)),
});

export default connect(null, mapDispatchToProps);
