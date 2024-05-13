import { getCurrencyByCode } from '@bigcapital/webapp/store/currencies/currencies.selector';
// @ts-nocheck
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => ({
  currency: getCurrencyByCode(state, props),
});

export default connect(mapStateToProps);
