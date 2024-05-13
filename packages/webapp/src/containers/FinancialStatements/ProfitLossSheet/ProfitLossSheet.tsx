import moment from 'moment';
import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import ProfitLossActionsBar from './ProfitLossActionsBar';
import ProfitLossSheetHeader from './ProfitLossSheetHeader';

import { DashboardPageContent } from '@bigcapital/webapp/components';

import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import withProfitLossActions from './withProfitLossActions';

import { ProfitLossBody } from './ProfitLossBody';
import { ProfitLossSheetProvider } from './ProfitLossProvider';
import { ProfitLossSheetDialogs } from './ProfitLossSheetDialogs';
import { ProfitLossSheetAlerts, ProfitLossSheetLoadingBar } from './components';
import { useProfitLossSheetQuery } from './utils';

/**
 * Profit/Loss financial statement sheet.
 * @returns {React.JSX}
 */
function ProfitLossSheet({
  // #withProfitLossActions
  toggleProfitLossFilterDrawer: toggleDisplayFilterDrawer,
}) {
  // Profit/loss sheet query.
  const { query, setLocationQuery } = useProfitLossSheetQuery();

  // Handle submit filter.
  const handleSubmitFilter = (filter) => {
    const newFilter = {
      ...filter,
      fromDate: moment(filter.fromDate).format('YYYY-MM-DD'),
      toDate: moment(filter.toDate).format('YYYY-MM-DD'),
    };
    setLocationQuery(newFilter);
  };
  // Handle number format submit.
  const handleNumberFormatSubmit = (numberFormat) => {
    setLocationQuery({
      ...query,
      numberFormat,
    });
  };
  // Hide the filter drawer once the page unmount.
  React.useEffect(
    () => () => {
      toggleDisplayFilterDrawer(false);
    },
    [toggleDisplayFilterDrawer],
  );

  return (
    <ProfitLossSheetProvider query={query}>
      <ProfitLossActionsBar numberFormat={query.numberFormat} onNumberFormatSubmit={handleNumberFormatSubmit} />
      <ProfitLossSheetLoadingBar />
      <ProfitLossSheetAlerts />

      <DashboardPageContent>
        <ProfitLossSheetHeader pageFilter={query} onSubmitFilter={handleSubmitFilter} />
        <ProfitLossBody />
      </DashboardPageContent>

      <ProfitLossSheetDialogs />
    </ProfitLossSheetProvider>
  );
}

export default R.compose(withDashboardActions, withProfitLossActions)(ProfitLossSheet);
