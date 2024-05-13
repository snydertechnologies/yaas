// @ts-nocheck
import React from 'react';
import { Route, Switch } from 'react-router';

import Dashboard from '@bigcapital/webapp/components/Dashboard/Dashboard';
import SetupWizardPage from '@bigcapital/webapp/containers/Setup/WizardSetupPage';

import EnsureOrganizationIsNotReady from '../Guards/EnsureOrganizationIsNotReady';
import EnsureOrganizationIsReady from '../Guards/EnsureOrganizationIsReady';
import { PrivatePagesProvider } from './PrivatePagesProvider';

import '@bigcapital/webapp/style/pages/Dashboard/Dashboard.scss';

/**
 * Dashboard inner private pages.
 */
export default function DashboardPrivatePages() {
  return (
    <PrivatePagesProvider>
      <Switch>
        <Route path={'/setup'}>
          <EnsureOrganizationIsNotReady>
            <SetupWizardPage />
          </EnsureOrganizationIsNotReady>
        </Route>

        <Route path="/">
          <EnsureOrganizationIsReady>
            <Dashboard />
          </EnsureOrganizationIsReady>
        </Route>
      </Switch>
    </PrivatePagesProvider>
  );
}
