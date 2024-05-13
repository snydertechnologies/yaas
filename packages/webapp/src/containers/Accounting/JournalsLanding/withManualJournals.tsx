import {
  getManualJournalsTableStateFactory,
  manualJournalTableStateChangedFactory,
} from '@bigcapital/webapp/store/manualJournals/manualJournals.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const getJournalsTableQuery = getManualJournalsTableStateFactory();
  const manualJournalTableStateChanged = manualJournalTableStateChangedFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      manualJournalsTableState: getJournalsTableQuery(state, props),
      manualJournalTableStateChanged: manualJournalTableStateChanged(state, props),
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };
  return connect(mapStateToProps);
};
