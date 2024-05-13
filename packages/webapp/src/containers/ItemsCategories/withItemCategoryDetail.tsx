import { getItemCategoryByIdFactory } from '@bigcapital/webapp/store/itemCategories/ItemsCategories.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default () => {
  const getCategoryId = getItemCategoryByIdFactory();

  const mapStateToProps = (state, props) => {
    return {
      itemCategoryDetail: getCategoryId(state, props),
    };
  };
  return connect(mapStateToProps);
};
