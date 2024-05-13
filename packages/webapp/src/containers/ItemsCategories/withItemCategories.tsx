import { getItemsCategoriesTableStateFactory } from '@bigcapital/webapp/store/itemCategories/ItemsCategories.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const getItemsCategoriesTableState = getItemsCategoriesTableStateFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      itemsCategoriesTableState: getItemsCategoriesTableState(state, props),
    };
    return mapState ? mapState(mapped, state, props) : mapState;
  };
  return connect(mapStateToProps);
};
