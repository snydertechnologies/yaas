import { CLASSES } from '@bigcapital/webapp/constants/classes';
import classNames from 'classnames';
// @ts-nocheck
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import DashboardTopbarUser from '@bigcapital/webapp/components/Dashboard/TopbarUser';
import withDashboard from '@bigcapital/webapp/containers/Dashboard/withDashboard';
import BranchesActions from '@bigcapital/webapp/containers/Preferences/Branches/BranchesActions';
import CurrenciesActions from '@bigcapital/webapp/containers/Preferences/Currencies/CurrenciesActions';
import UsersActions from '@bigcapital/webapp/containers/Preferences/Users/UsersActions';
import WarehousesActions from '@bigcapital/webapp/containers/Preferences/Warehouses/WarehousesActions';

import { compose } from '@bigcapital/webapp/utils';

import '@bigcapital/webapp/style/pages/Preferences/Topbar.scss';

/**
 * Preferences topbar.
 */
function PreferencesTopbar({ preferencesPageTitle }) {
  return (
    <div className={classNames(CLASSES.PREFERENCES_PAGE_TOPBAR, CLASSES.PREFERENCES_TOPBAR)}>
      <div className="preferences-topbar__title">
        <h2>{preferencesPageTitle}</h2>
      </div>
      <div className="preferences-topbar__actions">
        <Route pathname="/preferences">
          <Switch>
            <Route exact path={'/preferences/users'} component={UsersActions} />
            <Route exact path={'/preferences/currencies'} component={CurrenciesActions} />
            <Route exact path={'/preferences/warehouses'} component={WarehousesActions} />
            <Route exact path={'/preferences/branches'} component={BranchesActions} />
          </Switch>
        </Route>
      </div>

      <div className="preferences-topbar__user">
        <DashboardTopbarUser />
      </div>
    </div>
  );
}

export default compose(withDashboard(({ preferencesPageTitle }) => ({ preferencesPageTitle })))(PreferencesTopbar);
