import moment from 'moment';
// @ts-nocheck
import React, { useEffect } from 'react';

import { DashboardPageContent, FinancialStatement } from '@bigcapital/webapp/components';
import { BalanceSheetAlerts, BalanceSheetLoadingBar } from './components';

import { compose } from '@bigcapital/webapp/utils';
import BalanceSheetActionsBar from './BalanceSheetActionsBar';
import { BalanceSheetBody } from './BalanceSheetBody';
import BalanceSheetHeader from './BalanceSheetHeader';
import { BalanceSheetProvider } from './BalanceSheetProvider';
import { useBalanceSheetQuery } from './utils';

import { BalanceSheetDialogs } from './BalanceSheetDialogs';
import withBalanceSheetActions from './withBalanceSheetActions';

/**
 * Balance sheet.
 * @returns {React.JSX}
 */
function BalanceSheet({
  // #withBalanceSheetActions
  toggleBalanceSheetFilterDrawer,
}) {
  // Balance sheet query.
  const { query, setLocationQuery } = useBalanceSheetQuery();

  // Handle re-fetch balance sheet after filter change.
  const handleFilterSubmit = (filter) => {
    const newFilter = {
      ...filter,
      fromDate: moment(filter.fromDate).format('YYYY-MM-DD'),
      toDate: moment(filter.toDate).format('YYYY-MM-DD'),
    };
    setLocationQuery({ ...newFilter });
  };
  // Handle number format submit.
  const handleNumberFormatSubmit = (values) => {
    setLocationQuery({
      ...query,
      numberFormat: values,
    });
  };
  // Hides the balance sheet filter drawer once the page unmount.
  useEffect(
    () => () => {
      toggleBalanceSheetFilterDrawer(false);
    },
    [toggleBalanceSheetFilterDrawer],
  );

  return (
    <BalanceSheetProvider filter={query}>
      <BalanceSheetActionsBar numberFormat={query.numberFormat} onNumberFormatSubmit={handleNumberFormatSubmit} />
      <BalanceSheetLoadingBar />
      <BalanceSheetAlerts />

      <DashboardPageContent>
        <FinancialStatement>
          <BalanceSheetHeader pageFilter={query} onSubmitFilter={handleFilterSubmit} />
          <BalanceSheetBody />
        </FinancialStatement>
      </DashboardPageContent>

      <BalanceSheetDialogs />
    </BalanceSheetProvider>
  );
}

export default compose(withBalanceSheetActions)(BalanceSheet);
