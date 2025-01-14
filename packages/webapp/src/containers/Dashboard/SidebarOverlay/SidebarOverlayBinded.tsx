import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import withDashboardSidebar from '@bigcapital/webapp/containers/Dashboard/Sidebar/withDashboardSidebar';
import withDashboardSidebarActions from '@bigcapital/webapp/containers/Dashboard/Sidebar/withDashboardSidebarActions';
import { SidebarOverlay } from './SidebarOverlay';

import { useSubSidebarMenu } from '../Sidebar/hooks';

/**
 * Dashboard sidebar menu.
 * @returns {JSX.Element}
 */
function SidebarOverlayBindedRoot({
  // #withDashboardSidebar
  sidebarSubmenuOpen,
  sidebarSubmenuId,

  // #withDashboardSidebarActions
  closeDashboardSidebarSubmenu,
}) {
  const handleSidebarClosing = React.useCallback(() => {
    closeDashboardSidebarSubmenu();
  }, []);

  return (
    <SidebarOverlayBindedRouter
      sidebarSubmenuId={sidebarSubmenuId}
      isOpen={sidebarSubmenuOpen}
      onClose={handleSidebarClosing}
    />
  );
}

/**
 * Dashboard sidebar submenu router.
 */
function SidebarOverlayBindedRouter({ sidebarSubmenuId, ...rest }) {
  const sidebarItems = useSubSidebarMenu(sidebarSubmenuId);

  return <SidebarOverlay items={sidebarItems} {...rest} />;
}

/**
 * Sidebar overlay binded with redux.
 */
export const SidebarOverlayBinded = R.compose(
  withDashboardSidebar(({ sidebarSubmenuOpen, sidebarSubmenuId }) => ({
    sidebarSubmenuOpen,
    sidebarSubmenuId,
  })),
  withDashboardSidebarActions,
)(SidebarOverlayBindedRoot);
