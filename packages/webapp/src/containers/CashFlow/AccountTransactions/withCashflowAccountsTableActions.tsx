import {
  resetCashflowAccountsTableState,
  setCashflowAccountsTableState,
} from '@bigcapital/webapp/store/CashflowAccounts/CashflowAccounts.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapActionsToProps = (dispatch) => ({
  setCashflowAccountsTableState: (queries) => dispatch(setCashflowAccountsTableState(queries)),

  resetCashflowAccountsTableState: () => dispatch(resetCashflowAccountsTableState()),
});

export default connect(null, mapActionsToProps);
