import { toggleJournalSheeetFilterDrawer } from '@bigcapital/webapp/store/financialStatement/financialStatements.actions';
// @ts-nocheck
import { connect } from 'react-redux';

export const mapDispatchToProps = (dispatch) => ({
  toggleJournalSheetFilter: (toggle) => dispatch(toggleJournalSheeetFilterDrawer(toggle)),
});

export default connect(null, mapDispatchToProps);
