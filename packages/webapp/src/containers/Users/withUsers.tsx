import { getExpensesCurrentPageFactory } from '@bigcapital/webapp/store/users/users.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const mapStateToProps = (state, props) => {
    const mapped = {
      usersList: getExpensesCurrentPageFactory(state, props),
      usersLoading: state.users.loading,
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };

  return connect(mapStateToProps);
};
