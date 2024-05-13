import {
  getInvoicesTableStateFactory,
  isInvoicesTableStateChangedFactory,
} from '@bigcapital/webapp/store/Invoice/invoices.selector';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const getInvoicesTableState = getInvoicesTableStateFactory();
  const isInvoicesTableStateChanged = isInvoicesTableStateChangedFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      invoicesTableState: getInvoicesTableState(state, props),
      invoicesTableStateChanged: isInvoicesTableStateChanged(state, props),
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };
  return connect(mapStateToProps);
};
