import { getCurrenciesList } from '@bigcapital/webapp/store/currencies/currencies.selector';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const mapStateToProps = (state, props) => {
    const mapped = {
      currencies: state.currencies.data,
      currenciesList: getCurrenciesList(state, props),
      currenciesLoading: state.currencies.loading,
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };

  return connect(mapStateToProps);
};
