import {
  getProjectsTableStateFactory,
  isProjectsTableStateChangedFactory,
} from '@bigcapital/webapp/store/Project/projects.selectors';
// @ts-nocheck
import { connect } from 'react-redux';

export default (mapState) => {
  const getProjectsTableState = getProjectsTableStateFactory();
  const isProjectsTableStateChanged = isProjectsTableStateChangedFactory();

  const mapStateToProps = (state, props) => {
    const mapped = {
      projectsTableState: getProjectsTableState(state, props),
      projectsTableStateChanged: isProjectsTableStateChanged(state, props),
    };
    return mapState ? mapState(mapped, state, props) : mapped;
  };
  return connect(mapStateToProps);
};
