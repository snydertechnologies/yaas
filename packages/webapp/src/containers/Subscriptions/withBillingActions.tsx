import { submitBilling } from '@bigcapital/webapp/store/billing/Billing.action';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => ({
  requestSubmitBilling: (form) => dispatch(submitBilling({ form })),
});

export default connect(null, mapDispatchToProps);
