import { toggleInventoryValuationFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => ({
  toggleInventoryValuationFilterDrawer: (toggle) => dispatch(toggleInventoryValuationFilterDrawer(toggle)),
});

export default connect(null, mapDispatchToProps);
