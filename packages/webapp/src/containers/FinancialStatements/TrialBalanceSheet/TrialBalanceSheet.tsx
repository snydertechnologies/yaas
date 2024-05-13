import moment from 'moment';
// @ts-nocheck
import React, { useCallback, useEffect } from 'react';

import { DashboardPageContent, FinancialStatement } from '@bigcapital/webapp/components';
import TrialBalanceActionsBar from './TrialBalanceActionsBar';
import { TrialBalanceSheetProvider } from './TrialBalanceProvider';
import { TrialBalanceSheetBody } from './TrialBalanceSheetBody';
import TrialBalanceSheetHeader from './TrialBalanceSheetHeader';
import { useTrialBalanceSheetQuery } from './utils';

import { TrialBalanceSheetAlerts, TrialBalanceSheetLoadingBar } from './components';

import { compose } from '@bigcapital/webapp/utils';
import { TrialBalanceSheetDialogs } from './TrialBalanceSheetDialogs';
import withTrialBalanceActions from './withTrialBalanceActions';

/**
 * Trial balance sheet.
 */
function TrialBalanceSheet({
  // #withTrialBalanceSheetActions
  toggleTrialBalanceFilterDrawer: toggleFilterDrawer,
}) {
  const { query, setLocationQuery } = useTrialBalanceSheetQuery();

  // Handle filter form submit.
  const handleFilterSubmit = useCallback(
    (filter) => {
      const parsedFilter = {
        ...filter,
        fromDate: moment(filter.fromDate).format('YYYY-MM-DD'),
        toDate: moment(filter.toDate).format('YYYY-MM-DD'),
      };
      setLocationQuery(parsedFilter);
    },
    [setLocationQuery],
  );
  // Handle numebr format form submit.
  const handleNumberFormatSubmit = (numberFormat) => {
    setLocationQuery({
      ...query,
      numberFormat,
    });
  };
  // Hide the filter drawer once the page unmount.
  useEffect(
    () => () => {
      toggleFilterDrawer(false);
    },
    [toggleFilterDrawer],
  );

  return (
    <TrialBalanceSheetProvider query={query}>
      <TrialBalanceActionsBar numberFormat={query.numberFormat} onNumberFormatSubmit={handleNumberFormatSubmit} />
      <TrialBalanceSheetLoadingBar />
      <TrialBalanceSheetAlerts />

      <DashboardPageContent>
        <FinancialStatement>
          <TrialBalanceSheetHeader pageFilter={query} onSubmitFilter={handleFilterSubmit} />
          <TrialBalanceSheetBody />
        </FinancialStatement>
      </DashboardPageContent>

      <TrialBalanceSheetDialogs />
    </TrialBalanceSheetProvider>
  );
}

export default compose(withTrialBalanceActions)(TrialBalanceSheet);
