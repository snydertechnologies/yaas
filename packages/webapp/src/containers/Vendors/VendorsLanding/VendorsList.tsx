// @ts-nocheck
import React, { useEffect } from 'react';

import '@bigcapital/webapp/style/pages/Vendors/List.scss';

import { DashboardPageContent } from '@bigcapital/webapp/components';

import VendorActionsBar from './VendorActionsBar';
import VendorViewsTabs from './VendorViewsTabs';
import { VendorsListProvider } from './VendorsListProvider';
import VendorsTable from './VendorsTable';

import withVendors from './withVendors';
import withVendorsActions from './withVendorsActions';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Vendors list page.
 */
function VendorsList({
  // #withVendors
  vendorsTableState,
  vendorsTableStateChanged,

  // #withVendorsActions
  resetVendorsTableState,
}) {
  // Resets the vendors table state once the page unmount.
  useEffect(
    () => () => {
      resetVendorsTableState();
    },
    [resetVendorsTableState],
  );

  return (
    <VendorsListProvider tableState={vendorsTableState} tableStateChanged={vendorsTableStateChanged}>
      <VendorActionsBar />

      <DashboardPageContent>
        <VendorViewsTabs />
        <VendorsTable />
      </DashboardPageContent>
    </VendorsListProvider>
  );
}

export default compose(
  withVendors(({ vendorsTableState, vendorsTableStateChanged }) => ({
    vendorsTableState,
    vendorsTableStateChanged,
  })),
  withVendorsActions,
)(VendorsList);
