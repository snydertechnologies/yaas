// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

import '@bigcapital/webapp/style/pages/Preferences/warehousesList.scss';

import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import { compose } from '@bigcapital/webapp/utils';
import WarehousesGrid from './WarehousesGrid';

/**
 * Warehouses.
 * @returns
 */
function Warehouses({
  // #withDashboardActions
  changePreferencesPageTitle,
}) {
  React.useEffect(() => {
    changePreferencesPageTitle(intl.get('warehouses.label'));
  }, [changePreferencesPageTitle]);

  return (
    <React.Fragment>
      <WarehousesGrid />
    </React.Fragment>
  );
}
export default compose(withDashboardActions)(Warehouses);
