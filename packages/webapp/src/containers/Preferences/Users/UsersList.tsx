// @ts-nocheck
import React, { useEffect } from 'react';
import intl from 'react-intl-universal';

import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import { UsersListProvider } from './UsersProvider';

import { compose } from '@bigcapital/webapp/utils';
import UsersDataTable from './UsersDataTable';

/**
 * Users list.
 */
function UsersListPreferences({
  // #withDashboardActions
  changePreferencesPageTitle,
}) {
  useEffect(() => {
    changePreferencesPageTitle(intl.get('users'));
  }, [changePreferencesPageTitle]);

  return (
    <UsersListProvider>
      <UsersDataTable />
    </UsersListProvider>
  );
}

export default compose(withDashboardActions)(UsersListPreferences);
