import { resetAccountsTableState, setAccountsTableState } from '@bigcapital/webapp/store/accounts/accounts.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapActionsToProps = (dispatch) => ({
  setAccountsTableState: (queries) => dispatch(setAccountsTableState(queries)),
  resetAccountsTableState: () => dispatch(resetAccountsTableState()),
});

export default connect(null, mapActionsToProps);
