import { toggleAPAgingSummaryFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapActionsToProps = (dispatch) => ({
  toggleAPAgingSummaryFilterDrawer: (toggle) => dispatch(toggleAPAgingSummaryFilterDrawer(toggle)),
});

export default connect(null, mapActionsToProps);
