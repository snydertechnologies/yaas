import { getExpenseByIdFactory } from '@bigcapital/webapp/store/expenses/expenses.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default () => {
  const getExpenseById = getExpenseByIdFactory();

  const mapStateToProps = (state, props) => ({
    expense: getExpenseById(state, props),
  });
  return connect(mapStateToProps);
};
