import {
  resetCreditNoteTableState,
  setCreditNoteTableState,
} from '@bigcapital/webapp/store/CreditNote/creditNote.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapDipatchToProps = (dispatch) => ({
  setCreditNotesTableState: (queries) => dispatch(setCreditNoteTableState(queries)),
  resetCreditNotesTableState: () => dispatch(resetCreditNoteTableState()),
});

export default connect(null, mapDipatchToProps);
