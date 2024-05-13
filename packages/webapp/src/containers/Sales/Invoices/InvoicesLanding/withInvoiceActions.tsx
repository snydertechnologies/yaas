import { resetInvoicesTableState, setInvoicesTableState } from '@bigcapital/webapp/store/Invoice/invoices.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDipatchToProps = (dispatch) => ({
  setInvoicesTableState: (queries) => dispatch(setInvoicesTableState(queries)),
  resetInvoicesTableState: () => dispatch(resetInvoicesTableState()),
});

export default connect(null, mapDipatchToProps);
