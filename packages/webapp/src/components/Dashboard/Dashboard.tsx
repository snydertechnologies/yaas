// @ts-nocheck
import React from 'react';
import { Route, Switch } from 'react-router';

import '@bigcapital/webapp/style/pages/Dashboard/Dashboard.scss';

import DashboardContent from '@bigcapital/webapp/components/Dashboard/DashboardContent';
import DashboardSplitPane from '@bigcapital/webapp/components/Dashboard/DashboardSplitePane';
import DialogsContainer from '@bigcapital/webapp/components/DialogsContainer';
import DrawersContainer from '@bigcapital/webapp/components/DrawersContainer';
import PreferencesPage from '@bigcapital/webapp/components/Preferences/PreferencesPage';
import AlertsContainer from '@bigcapital/webapp/containers/AlertsContainer';
import { Sidebar } from '@bigcapital/webapp/containers/Dashboard/Sidebar/Sidebar';
import DashboardUniversalSearch from '@bigcapital/webapp/containers/UniversalSearch/DashboardUniversalSearch';
import DashboardProvider from './DashboardProvider';
import { DashboardSockets } from './DashboardSockets';
import GlobalHotkeys from './GlobalHotkeys';

/**
 * Dashboard preferences.
 */
function DashboardPreferences() {
  return (
    <DashboardSplitPane>
      <Sidebar />
      <PreferencesPage />
    </DashboardSplitPane>
  );
}

/**
 * Dashboard other routes.
 */
function DashboardAnyPage() {
  return (
    <DashboardSplitPane>
      <Sidebar />
      <DashboardContent />
    </DashboardSplitPane>
  );
}

/**
 * Dashboard page.
 */
export default function Dashboard() {
  return (
    <DashboardProvider>
      <Switch>
        <Route path="/preferences" component={DashboardPreferences} />
        <Route path="/" component={DashboardAnyPage} />
      </Switch>

      <DashboardSockets />
      <DashboardUniversalSearch />
      <GlobalHotkeys />
      <DialogsContainer />
      <DrawersContainer />
      <AlertsContainer />
    </DashboardProvider>
  );
}
