import moment from 'moment';
// @ts-nocheck
import React, { useEffect, useState } from 'react';

import { DashboardPageContent, FinancialStatement } from '@bigcapital/webapp/components';

import CustomersTransactionsActionsBar from './CustomersTransactionsActionsBar';
import CustomersTransactionsHeader from './CustomersTransactionsHeader';

import { CustomersTransactionsBody } from './CustomersTransactionsBody';
import { CustomersTransactionsProvider } from './CustomersTransactionsProvider';
import { CustomersTransactionsLoadingBar } from './components';
import withCustomersTransactionsActions from './withCustomersTransactionsActions';

import { compose } from '@bigcapital/webapp/utils';
import { CustomersTransactionsDialogs } from './CustomersTransactionsDialogs';
import { useCustomersTransactionsQuery } from './_utils';

/**
 * Customers transactions.
 */
function CustomersTransactions({
  //#withCustomersTransactionsActions
  toggleCustomersTransactionsFilterDrawer,
}) {
  // filter
  const [filter, setFilter] = useCustomersTransactionsQuery();

  const handleFilterSubmit = (filter) => {
    const _filter = {
      ...filter,
      fromDate: moment(filter.fromDate).format('YYYY-MM-DD'),
      toDate: moment(filter.toDate).format('YYYY-MM-DD'),
    };
    setFilter({ ..._filter });
  };

  // Handle number format submit.
  const handleNumberFormatSubmit = (values) => {
    setFilter({
      ...filter,
      numberFormat: values,
    });
  };

  useEffect(
    () => () => {
      toggleCustomersTransactionsFilterDrawer(false);
    },
    [toggleCustomersTransactionsFilterDrawer],
  );

  return (
    <CustomersTransactionsProvider filter={filter}>
      <CustomersTransactionsActionsBar
        numberFormat={filter.numberFormat}
        onNumberFormatSubmit={handleNumberFormatSubmit}
      />
      <CustomersTransactionsLoadingBar />
      <DashboardPageContent>
        <FinancialStatement>
          <CustomersTransactionsHeader pageFilter={filter} onSubmitFilter={handleFilterSubmit} />
          <CustomersTransactionsBody />
        </FinancialStatement>
      </DashboardPageContent>

      <CustomersTransactionsDialogs />
    </CustomersTransactionsProvider>
  );
}
export default compose(withCustomersTransactionsActions)(CustomersTransactions);
