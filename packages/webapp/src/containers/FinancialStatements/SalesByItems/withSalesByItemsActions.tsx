import { toggleSalesByItemsFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => ({
  toggleSalesByItemsFilterDrawer: (toggle) => dispatch(toggleSalesByItemsFilterDrawer(toggle)),
});

export default connect(null, mapDispatchToProps);
