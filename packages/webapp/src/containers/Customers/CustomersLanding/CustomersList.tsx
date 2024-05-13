// @ts-nocheck
import React, { useEffect } from 'react';

import '@bigcapital/webapp/style/pages/Customers/List.scss';

import { DashboardPageContent } from '@bigcapital/webapp/components';

import CustomersActionsBar from './CustomersActionsBar';
import { CustomersListProvider } from './CustomersListProvider';
import CustomersTable from './CustomersTable';
import CustomersViewsTabs from './CustomersViewsTabs';

import withCustomers from './withCustomers';
import withCustomersActions from './withCustomersActions';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Customers list.
 */
function CustomersList({
  // #withCustomers
  customersTableState,
  customersTableStateChanged,

  // #withCustomersActions
  resetCustomersTableState,
}) {
  // Resets the accounts table state once the page unmount.
  useEffect(
    () => () => {
      resetCustomersTableState();
    },
    [resetCustomersTableState],
  );

  return (
    <CustomersListProvider tableState={customersTableState} tableStateChanged={customersTableStateChanged}>
      <CustomersActionsBar />

      <DashboardPageContent>
        <CustomersViewsTabs />
        <CustomersTable />
      </DashboardPageContent>
    </CustomersListProvider>
  );
}

export default compose(
  withCustomers(({ customersTableState, customersTableStateChanged }) => ({
    customersTableState,
    customersTableStateChanged,
  })),
  withCustomersActions,
)(CustomersList);
