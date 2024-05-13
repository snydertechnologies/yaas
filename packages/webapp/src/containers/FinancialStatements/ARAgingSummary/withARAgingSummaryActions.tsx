import { toggleARAgingSummaryFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapActionsToProps = (dispatch) => ({
  toggleARAgingSummaryFilterDrawer: (toggle) => dispatch(toggleARAgingSummaryFilterDrawer(toggle)),
});

export default connect(null, mapActionsToProps);
