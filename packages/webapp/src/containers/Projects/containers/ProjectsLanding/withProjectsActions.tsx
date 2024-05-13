// @ts-nocheck
import { connect } from 'react-redux';

import { resetProjectsTableState, setProjectsTableState } from '@bigcapital/webapp/store/Project/projects.actions';

const mapDispatchToProps = (dispatch) => ({
  setProjectsTableState: (state) => dispatch(setProjectsTableState(state)),
  resetProjectsTableState: () => dispatch(resetProjectsTableState()),
});

export default connect(null, mapDispatchToProps);
