import { getInventroyAdjsTableStateFactory } from '@bigcapital/webapp/store/inventoryAdjustments/inventoryAdjustment.selector';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const getInventoryAdjustmentTableState = getInventroyAdjsTableStateFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      inventoryAdjustmentTableState: getInventoryAdjustmentTableState(state, props),
      inventoryAdjustmentsSelectedRows: state.inventoryAdjustments.selectedRows,
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };
  return connect(mapStateToProps);
};
