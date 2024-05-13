import {
  accountsTableStateChangedFactory,
  getAccountsTableStateFactory,
} from '@bigcapital/webapp/store/accounts/accounts.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const getAccountsTableState = getAccountsTableStateFactory();
  const accountsTableStateChanged = accountsTableStateChangedFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      accountsTableState: getAccountsTableState(state, props),
      accountsTableStateChanged: accountsTableStateChanged(state, props),
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };

  return connect(mapStateToProps);
};
