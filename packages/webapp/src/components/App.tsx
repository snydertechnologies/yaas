import { createBrowserHistory } from 'history';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
// @ts-nocheck
import { Route, Router, Switch } from 'react-router';

import '@bigcapital/webapp/style/App.scss';
import 'moment/locale/ar-ly';
import 'moment/locale/es-us';

import DashboardPrivatePages from '@bigcapital/webapp/components/Dashboard/PrivatePages';
import { EnsureAuthenticated } from '@bigcapital/webapp/components/Guards/EnsureAuthenticated';
import { Authentication } from '@bigcapital/webapp/containers/Authentication/Authentication';
import GlobalErrors from '@bigcapital/webapp/containers/GlobalErrors/GlobalErrors';
import AppIntlLoader from './AppIntlLoader';

import LazyLoader from '@bigcapital/webapp/components/LazyLoader';
import { DashboardThemeProvider, SplashScreen } from '../components';
import { queryConfig } from '../hooks/query/base';
import { EnsureAuthNotAuthenticated } from './Guards/EnsureAuthNotAuthenticated';
import { EnsureUserEmailNotVerified } from './Guards/EnsureUserEmailNotVerified';
import { EnsureUserEmailVerified } from './Guards/EnsureUserEmailVerified';

const EmailConfirmation = LazyLoader({
  loader: () => import('@bigcapital/webapp/containers/Authentication/EmailConfirmation'),
});
const RegisterVerify = LazyLoader({
  loader: () => import('@bigcapital/webapp/containers/Authentication/RegisterVerify'),
});

/**
 * App inner.
 */
function AppInsider({ history }) {
  return (
    <div className="App">
      <DashboardThemeProvider>
        <Router history={history}>
          <Switch>
            <Route path={'/auth/register/verify'}>
              <EnsureAuthenticated>
                <EnsureUserEmailNotVerified>
                  <RegisterVerify />
                </EnsureUserEmailNotVerified>
              </EnsureAuthenticated>
            </Route>

            <Route path={'/auth/email_confirmation'}>
              <EmailConfirmation />
            </Route>

            <Route path={'/auth'}>
              <EnsureAuthNotAuthenticated>
                <Authentication />
              </EnsureAuthNotAuthenticated>
            </Route>

            <Route path={'/'}>
              <EnsureAuthenticated>
                <EnsureUserEmailVerified>
                  <DashboardPrivatePages />
                </EnsureUserEmailVerified>
              </EnsureAuthenticated>
            </Route>
          </Switch>
        </Router>

        <GlobalErrors />
      </DashboardThemeProvider>
    </div>
  );
}

/**
 * Core application.
 */
export default function App() {
  // Browser history.
  const history = createBrowserHistory();

  // Query client.
  const queryClient = new QueryClient(queryConfig);

  return (
    <QueryClientProvider client={queryClient}>
      <SplashScreen />

      <AppIntlLoader>
        <AppInsider history={history} />
      </AppIntlLoader>

      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
