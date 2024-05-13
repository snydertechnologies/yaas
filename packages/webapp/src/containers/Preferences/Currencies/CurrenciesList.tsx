// @ts-nocheck
import React, { useEffect } from 'react';
import intl from 'react-intl-universal';

import CurrenciesDataTable from './CurrenciesDataTable';
import { CurrenciesProvider } from './CurrenciesProvider';

import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';

import { compose } from '@bigcapital/webapp/utils';

function CurrenciesList({
  // #withDashboardActions
  changePreferencesPageTitle,
}) {
  useEffect(() => {
    changePreferencesPageTitle(intl.get('currencies'));
  }, [changePreferencesPageTitle]);

  return (
    <CurrenciesProvider>
      <CurrenciesDataTable />
    </CurrenciesProvider>
  );
}

export default compose(withDashboardActions)(CurrenciesList);
