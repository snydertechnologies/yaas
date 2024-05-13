import preferencesRoutes from '@bigcapital/webapp/routes/preferences';
// @ts-nocheck
import React from 'react';
import { Route, Switch } from 'react-router-dom';

export default function DashboardContentRoute() {
  return (
    <Route pathname="/preferences">
      <Switch>
        {preferencesRoutes.map((route, index) => (
          <Route key={index} path={`${route.path}`} exact={route.exact} component={route.component} />
        ))}
      </Switch>
    </Route>
  );
}
