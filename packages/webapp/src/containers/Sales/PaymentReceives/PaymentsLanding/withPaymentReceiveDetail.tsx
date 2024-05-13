import {
  getPaymentReceiveByIdFactory,
  getPaymentReceiveEntriesFactory,
} from '@bigcapital/webapp/store/PaymentReceives/paymentReceives.selector';
// @ts-nocheck
import { connect } from 'react-redux';

export default () => {
  const getPaymentReceiveById = getPaymentReceiveByIdFactory();
  const getPaymentReceiveEntries = getPaymentReceiveEntriesFactory();

  const mapStateToProps = (state, props) => ({
    paymentReceive: getPaymentReceiveById(state, props),
    paymentReceiveEntries: getPaymentReceiveEntries(state, props),
  });
  return connect(mapStateToProps);
};
