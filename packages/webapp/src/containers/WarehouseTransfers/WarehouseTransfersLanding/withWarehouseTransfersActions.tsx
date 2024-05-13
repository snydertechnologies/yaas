import {
  resetWarehouseTransferTableState,
  setWarehouseTransferTableState,
} from '@bigcapital/webapp/store/WarehouseTransfer/warehouseTransfer.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDipatchToProps = (dispatch) => ({
  setWarehouseTransferTableState: (queries) => dispatch(setWarehouseTransferTableState(queries)),
  resetWarehouseTransferTableState: () => dispatch(resetWarehouseTransferTableState()),
});

export default connect(null, mapDipatchToProps);
