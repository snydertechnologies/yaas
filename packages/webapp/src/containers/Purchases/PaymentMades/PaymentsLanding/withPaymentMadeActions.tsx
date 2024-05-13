import {
  resetPaymentMadesTableState,
  setPaymentMadesTableState,
} from '@bigcapital/webapp/store/PaymentMades/paymentMades.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  setPaymentMadesTableState: (state) => dispatch(setPaymentMadesTableState(state)),

  resetPaymentMadesTableState: () => dispatch(resetPaymentMadesTableState()),
});
export default connect(null, mapDispatchToProps);
