import moment from 'moment';
import * as R from 'ramda';
// @ts-nocheck
import React, { useEffect } from 'react';

import { DashboardPageContent, FinancialStatement } from '@bigcapital/webapp/components';

import CustomersBalanceSummaryActionsBar from './CustomersBalanceSummaryActionsBar';
import CustomersBalanceSummaryHeader from './CustomersBalanceSummaryHeader';

import { DialogsName } from '@bigcapital/webapp/constants/dialogs';
import { CustomerBalanceSummaryPdfDialog } from './CustomerBalancePdfDialog';
import { CustomerBalanceSummaryBody } from './CustomerBalanceSummaryBody';
import { CustomersBalanceSummaryProvider } from './CustomersBalanceSummaryProvider';
import { CustomersBalanceLoadingBar } from './components';
import { useCustomerBalanceSummaryQuery } from './utils';
import withCustomersBalanceSummaryActions from './withCustomersBalanceSummaryActions';

/**
 * Customers Balance summary.
 */
function CustomersBalanceSummary({
  // #withCustomersBalanceSummaryActions
  toggleCustomerBalanceFilterDrawer,
}) {
  const { query, setLocationQuery } = useCustomerBalanceSummaryQuery();

  // Handle re-fetch customers balance summary after filter change.
  const handleFilterSubmit = (filter) => {
    const _filter = {
      ...filter,
      asDate: moment(filter.asDate).format('YYYY-MM-DD'),
    };
    setLocationQuery({ ..._filter });
  };
  // Handle number format.
  const handleNumberFormat = (values) => {
    setLocationQuery({
      ...filter,
      numberFormat: values,
    });
  };

  useEffect(() => () => toggleCustomerBalanceFilterDrawer(false), [toggleCustomerBalanceFilterDrawer]);

  return (
    <CustomersBalanceSummaryProvider filter={query}>
      <CustomersBalanceSummaryActionsBar numberFormat={query?.numberFormat} onNumberFormatSubmit={handleNumberFormat} />
      <CustomersBalanceLoadingBar />

      <DashboardPageContent>
        <FinancialStatement>
          <CustomersBalanceSummaryHeader pageFilter={query} onSubmitFilter={handleFilterSubmit} />
          <CustomerBalanceSummaryBody />
        </FinancialStatement>
      </DashboardPageContent>

      <CustomerBalanceSummaryPdfDialog dialogName={DialogsName.CustomerBalanceSummaryPdfPreview} />
    </CustomersBalanceSummaryProvider>
  );
}
export default R.compose(withCustomersBalanceSummaryActions)(CustomersBalanceSummary);
