import { setInventoryAdjustmentsTableState } from '@bigcapital/webapp/store/inventoryAdjustments/inventoryAdjustment.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  setInventoryAdjustmentTableState: (queries) => dispatch(setInventoryAdjustmentsTableState(queries)),
});

export default connect(null, mapDispatchToProps);
