import { togglePurchasesByItemsFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => ({
  togglePurchasesByItemsFilterDrawer: (toggle) => dispatch(togglePurchasesByItemsFilterDrawer(toggle)),
});

export default connect(null, mapDispatchToProps);
