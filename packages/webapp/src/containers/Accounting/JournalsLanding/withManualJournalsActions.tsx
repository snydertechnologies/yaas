import { setManualJournalsTableState } from '@bigcapital/webapp/store/manualJournals/manualJournals.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapActionsToProps = (dispatch) => ({
  setManualJournalsTableState: (queries) => dispatch(setManualJournalsTableState(queries)),
});

export default connect(null, mapActionsToProps);
