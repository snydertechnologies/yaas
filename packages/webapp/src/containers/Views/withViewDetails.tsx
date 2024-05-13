import { getViewItemFactory, getViewMetaFactory } from '@bigcapital/webapp/store/customViews/customViews.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default () => {
  const getViewItem = getViewItemFactory();
  const getViewMeta = getViewMetaFactory();

  const mapStateToProps = (state, props) => ({
    viewMeta: getViewMeta(state, props),
    viewItem: getViewItem(state, props),
  });
  return connect(mapStateToProps);
};
