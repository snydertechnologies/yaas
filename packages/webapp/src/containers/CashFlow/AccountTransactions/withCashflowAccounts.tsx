import { getCashflowAccountsTableStateFactory } from '@bigcapital/webapp/store/CashflowAccounts/CashflowAccounts.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const getCashflowAccountsTableState = getCashflowAccountsTableStateFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      cashflowAccountsTableState: getCashflowAccountsTableState(state, props),
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };

  return connect(mapStateToProps);
};
