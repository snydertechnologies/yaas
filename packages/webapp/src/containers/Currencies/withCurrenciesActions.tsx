import {
  deleteCurrency,
  editCurrency,
  fetchCurrencies,
  submitCurrencies,
} from '@bigcapital/webapp/store/currencies/currencies.actions';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => ({
  requestFetchCurrencies: () => dispatch(fetchCurrencies({})),
  requestSubmitCurrencies: (form) => dispatch(submitCurrencies({ form })),
  requestEditCurrency: (id, form) => dispatch(editCurrency({ id, form })),
  requestDeleteCurrency: (currency_code) => dispatch(deleteCurrency({ currency_code })),
});

export default connect(null, mapDispatchToProps);
