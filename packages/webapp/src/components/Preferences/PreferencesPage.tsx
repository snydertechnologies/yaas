import classNames from 'classnames';
import * as R from 'ramda';
// @ts-nocheck
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { CLASSES } from '@bigcapital/webapp/constants/classes';

import DashboardErrorBoundary from '@bigcapital/webapp/components/Dashboard/DashboardErrorBoundary';
import PreferencesContentRoute from '@bigcapital/webapp/components/Preferences/PreferencesContentRoute';
import PreferencesSidebar from '@bigcapital/webapp/components/Preferences/PreferencesSidebar';
import PreferencesTopbar from '@bigcapital/webapp/components/Preferences/PreferencesTopbar';

import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';

import '@bigcapital/webapp/style/pages/Preferences/Page.scss';

/**
 * Preferences page.
 */
function PreferencesPage({ toggleSidebarExpand }) {
  // Shrink the dashboard sidebar once open application preferences page.
  React.useEffect(() => {
    toggleSidebarExpand(false);
  }, [toggleSidebarExpand]);

  return (
    <ErrorBoundary FallbackComponent={DashboardErrorBoundary}>
      <div id={'dashboard'} className={classNames(CLASSES.DASHBOARD_CONTENT, CLASSES.DASHBOARD_CONTENT_PREFERENCES)}>
        <div className={classNames(CLASSES.PREFERENCES_PAGE)}>
          <PreferencesSidebar />

          <div className={CLASSES.PREFERENCES_PAGE_CONTENT}>
            <PreferencesTopbar pageTitle={'asdad'} />
            <PreferencesContentRoute />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default R.compose(withDashboardActions)(PreferencesPage);
