import {
  billsTableStateChangedFactory,
  getBillsTableStateFactory,
} from '@bigcapital/webapp/store/Bills/bills.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const getBillsTableState = getBillsTableStateFactory();
  const billsTableStateChanged = billsTableStateChangedFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      billsTableState: getBillsTableState(state, props),
      billsTableStateChanged: billsTableStateChanged(state, props),
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };
  return connect(mapStateToProps);
};
