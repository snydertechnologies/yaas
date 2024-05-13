import { resetExpensesTableState, setExpensesTableState } from '@bigcapital/webapp/store/expenses/expenses.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  setExpensesTableState: (state) => dispatch(setExpensesTableState(state)),
  resetExpensesTableState: (state) => dispatch(resetExpensesTableState(state)),
});

export default connect(null, mapDispatchToProps);
