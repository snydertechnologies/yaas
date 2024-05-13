import moment from 'moment';
// @ts-nocheck
import React, { useEffect } from 'react';

import { DashboardPageContent, FinancialStatement } from '@bigcapital/webapp/components';

import VendorsBalanceSummaryActionsBar from './VendorsBalanceSummaryActionsBar';
import VendorsBalanceSummaryHeader from './VendorsBalanceSummaryHeader';

import { VendorBalanceSummaryBody } from './VendorsBalanceSummaryBody';
import { VendorsBalanceSummaryProvider } from './VendorsBalanceSummaryProvider';
import { VendorsSummarySheetLoadingBar } from './components';

import withVendorsBalanceSummaryActions from './withVendorsBalanceSummaryActions';

import { compose } from '@bigcapital/webapp/utils';
import { VendorBalanceDialogs } from './VendorBalanceDialogs';
import { useVendorsBalanceSummaryQuery } from './utils';

/**
 * Vendors Balance summary.
 */
function VendorsBalanceSummary({
  // #withVendorsBalanceSummaryActions
  toggleVendorSummaryFilterDrawer,
}) {
  const { query, setLocationQuery } = useVendorsBalanceSummaryQuery();

  // Handle refetch vendors balance summary.
  const handleFilterSubmit = (filter) => {
    const _filter = {
      ...filter,
      asDate: moment(filter.asDate).format('YYYY-MM-DD'),
    };
    setLocationQuery(_filter);
  };

  // Handle number format submit.
  const handleNumberFormatSubmit = (format) => {
    setLocationQuery({
      ...filter,
      numberFormat: format,
    });
  };

  useEffect(() => () => toggleVendorSummaryFilterDrawer(false), [toggleVendorSummaryFilterDrawer]);

  return (
    <VendorsBalanceSummaryProvider filter={query}>
      <VendorsBalanceSummaryActionsBar
        numberFormat={query?.numberFormat}
        onNumberFormatSubmit={handleNumberFormatSubmit}
      />
      <VendorsSummarySheetLoadingBar />

      <DashboardPageContent>
        <FinancialStatement>
          <VendorsBalanceSummaryHeader pageFilter={query} onSubmitFilter={handleFilterSubmit} />
          <VendorBalanceSummaryBody />
        </FinancialStatement>
      </DashboardPageContent>

      <VendorBalanceDialogs />
    </VendorsBalanceSummaryProvider>
  );
}

export default compose(withVendorsBalanceSummaryActions)(VendorsBalanceSummary);
