import {
  getPaymentMadesTableStateFactory,
  paymentsTableStateChangedFactory,
} from '@bigcapital/webapp/store/PaymentMades/paymentMades.selector';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const getPaymentMadesTableState = getPaymentMadesTableStateFactory();
  const paymentsTableStateChanged = paymentsTableStateChangedFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      paymentMadesTableState: getPaymentMadesTableState(state, props),
      paymentsTableStateChanged: paymentsTableStateChanged(state, props),
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };
  return connect(mapStateToProps);
};
