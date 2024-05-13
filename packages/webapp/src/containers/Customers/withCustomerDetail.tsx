import { getCustomerById } from '@bigcapital/webapp/store/customers/customers.reducer';
// @ts-nocheck
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => ({
  customer: getCustomerById(state, props.customerId),
});

export default connect(mapStateToProps);
