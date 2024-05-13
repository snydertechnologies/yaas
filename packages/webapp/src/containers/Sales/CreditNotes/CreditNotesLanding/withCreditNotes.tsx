import {
  getCreditNotesTableStateFactory,
  isCreditNotesTableStateChangedFactory,
} from '@bigcapital/webapp/store/CreditNote/creditNote.selector';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const getCreditNoteTableState = getCreditNotesTableStateFactory();
  const isCreditNoteTableChanged = isCreditNotesTableStateChangedFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      creditNoteTableState: getCreditNoteTableState(state, props),
      creditNoteTableStateChanged: isCreditNoteTableChanged(state, props),
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };
  return connect(mapStateToProps);
};
