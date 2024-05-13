import { Hint, Icon, If, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Button, Classes, Navbar, NavbarDivider, NavbarGroup, Position, Tooltip } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router';

import DashboardBackLink from '@bigcapital/webapp/components/Dashboard/DashboardBackLink';
import DashboardBreadcrumbs from '@bigcapital/webapp/components/Dashboard/DashboardBreadcrumbs';
import DashboardTopbarUser from '@bigcapital/webapp/components/Dashboard/TopbarUser';

import withDashboard from '@bigcapital/webapp/containers/Dashboard/withDashboard';
import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import withUniversalSearchActions from '@bigcapital/webapp/containers/UniversalSearch/withUniversalSearchActions';

import QuickNewDropdown from '@bigcapital/webapp/containers/QuickNewDropdown/QuickNewDropdown';
import { compose } from '@bigcapital/webapp/utils';
import { DashboardHamburgerButton, DashboardQuickSearchButton } from './_components';

/**
 * Dashboard topbar.
 */
function DashboardTopbar({
  // #withDashboard
  pageTitle,
  editViewId,
  pageHint,

  // #withDashboardActions
  toggleSidebarExpand,

  // #withDashboard
  sidebarExpended,

  // #withGlobalSearch
  openGlobalSearch,
}) {
  const history = useHistory();

  const handlerClickEditView = () => {
    history.push(`/custom_views/${editViewId}/edit`);
  };

  const handleSidebarToggleBtn = () => {
    toggleSidebarExpand();
  };

  return (
    <div className="dashboard__topbar" data-testId={'dashboard-topbar'}>
      <div className="dashboard__topbar-left">
        <div className="dashboard__topbar-sidebar-toggle">
          <Tooltip
            content={!sidebarExpended ? <T id={'open_sidebar'} /> : <T id={'close_sidebar'} />}
            position={Position.RIGHT}
          >
            <DashboardHamburgerButton onClick={handleSidebarToggleBtn} />
          </Tooltip>
        </div>

        <div className="dashboard__title">
          <h1>{pageTitle}</h1>

          <If condition={pageHint}>
            <div className="dashboard__hint">
              <Hint content={pageHint} />
            </div>
          </If>

          <If condition={editViewId}>
            <Button
              className={Classes.MINIMAL + ' button--view-edit'}
              icon={<Icon icon="pen" iconSize={13} />}
              onClick={handlerClickEditView}
            />
          </If>
        </div>

        <div className="dashboard__breadcrumbs">
          <DashboardBreadcrumbs />
        </div>
        <DashboardBackLink />
      </div>

      <div className="dashboard__topbar-right">
        <Navbar className="dashboard__topbar-navbar">
          <NavbarGroup>
            <DashboardQuickSearchButton onClick={() => openGlobalSearch(true)} />
            <QuickNewDropdown />

            <Tooltip content={<T id={'notifications'} />} position={Position.BOTTOM}>
              <Button className={Classes.MINIMAL} icon={<Icon icon={'notification-24'} iconSize={20} />} />
            </Tooltip>

            <Button
              className={Classes.MINIMAL}
              icon={<Icon icon={'help-24'} iconSize={20} />}
              text={<T id={'help'} />}
            />
            <NavbarDivider />
          </NavbarGroup>
        </Navbar>

        <div className="dashboard__topbar-user">
          <DashboardTopbarUser />
        </div>
      </div>
    </div>
  );
}

export default compose(
  withUniversalSearchActions,
  withDashboard(({ pageTitle, pageHint, editViewId, sidebarExpended }) => ({
    pageTitle,
    editViewId,
    sidebarExpended,
    pageHint,
  })),
  withDashboardActions,
)(DashboardTopbar);
