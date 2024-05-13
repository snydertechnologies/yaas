import { getPaymentMadeByIdFactory } from '@bigcapital/webapp/store/PaymentMades/paymentMade.selector';
// @ts-nocheck
import { connect } from 'react-redux';

export default () => {
  const getPaymentMadeById = getPaymentMadeByIdFactory();

  const mapStateToProps = (state, props) => ({
    paymentMade: getPaymentMadeById(state, props),
  });
  return connect(mapStateToProps);
};
