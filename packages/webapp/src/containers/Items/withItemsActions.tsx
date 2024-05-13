import { resetItemsTableState, setItemsTableState } from '@bigcapital/webapp/store/items/items.actions';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => ({
  setItemsTableState: (queries) => dispatch(setItemsTableState(queries)),
  resetItemsTableState: () => dispatch(resetItemsTableState()),
});

export default connect(null, mapDispatchToProps);
