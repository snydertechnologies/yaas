import { closeSidebarSubmenu, openSidebarSubmenu } from '@bigcapital/webapp/store/dashboard/dashboard.actions';
// @ts-nocheck
import { connect } from 'react-redux';

const mapActionsToProps = (dispatch) => ({
  // Opens the dashboard submenu sidebar.
  openDashboardSidebarSubmenu: (submenuId) => dispatch(openSidebarSubmenu(submenuId)),

  // Closes the dashboard submenu sidebar.
  closeDashboardSidebarSubmenu: () => dispatch(closeSidebarSubmenu()),
});

export default connect(null, mapActionsToProps);
