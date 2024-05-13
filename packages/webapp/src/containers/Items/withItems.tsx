import {
  getItemsTableStateFactory,
  isItemsTableStateChangedFactory,
} from '@bigcapital/webapp/store/items/items.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const getItemsTableState = getItemsTableStateFactory();
  const isItemsTableStateChanged = isItemsTableStateChangedFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      itemsSelectedRows: state.items.selectedRows,
      itemsTableState: getItemsTableState(state, props),
      itemsTableStateChanged: isItemsTableStateChanged(state, props),
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };

  return connect(mapStateToProps);
};
