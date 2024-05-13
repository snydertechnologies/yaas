import {
  expensesTableStateChangedFactory,
  getExpensesTableStateFactory,
} from '@bigcapital/webapp/store/expenses/expenses.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const getExpensesTableState = getExpensesTableStateFactory();
  const expensesTableStateChanged = expensesTableStateChangedFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      expensesTableState: getExpensesTableState(state, props),
      expensesTableStateChanged: expensesTableStateChanged(state, props),
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };
  return connect(mapStateToProps);
};
