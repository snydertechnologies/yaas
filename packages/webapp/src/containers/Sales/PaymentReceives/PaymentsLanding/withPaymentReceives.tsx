import {
  getPaymentReceiveTableStateFactory,
  paymentsTableStateChangedFactory,
} from '@bigcapital/webapp/store/PaymentReceives/paymentReceives.selector';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const getPaymentReceiveTableState = getPaymentReceiveTableStateFactory();
  const paymentsTableStateChanged = paymentsTableStateChangedFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      paymentReceivesTableState: getPaymentReceiveTableState(state, props),
      paymentsTableStateChanged: paymentsTableStateChanged(state, props),
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };
  return connect(mapStateToProps);
};
