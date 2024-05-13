import { toggleInventoryItemDetailsFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapActionsToProps = (dispatch) => ({
  toggleInventoryItemDetailsFilterDrawer: (toggle) => dispatch(toggleInventoryItemDetailsFilterDrawer(toggle)),
});

export default connect(null, mapActionsToProps);
