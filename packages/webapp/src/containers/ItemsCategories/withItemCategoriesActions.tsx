import { setItemsCategoriesTableState } from '@bigcapital/webapp/store/itemCategories/itemsCategory.actions';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => ({
  setItemsCategoriesTableState: (state) => dispatch(setItemsCategoriesTableState(state)),
});

export default connect(null, mapDispatchToProps);
