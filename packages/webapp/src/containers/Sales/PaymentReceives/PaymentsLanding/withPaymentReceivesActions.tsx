import {
  resetPaymentReceivesTableState,
  setPaymentReceivesTableState,
} from '@bigcapital/webapp/store/PaymentReceives/paymentReceives.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
  setPaymentReceivesTableState: (state) => dispatch(setPaymentReceivesTableState(state)),

  resetPaymentReceivesTableState: () => dispatch(resetPaymentReceivesTableState()),
});

export default connect(null, mapDispatchToProps);
