import moment from 'moment';
// @ts-nocheck
import React, { useCallback, useEffect } from 'react';

import { DashboardPageContent, FinancialStatement } from '@bigcapital/webapp/components';

import JournalActionsBar from './JournalActionsBar';
import { JournalBody } from './JournalBody';
import JournalHeader from './JournalHeader';
import { JournalSheetProvider } from './JournalProvider';
import { JournalSheetAlerts, JournalSheetLoadingBar } from './components';

import withDashboardActions from '@bigcapital/webapp/containers/Dashboard/withDashboardActions';
import withJournalActions from './withJournalActions';

import { compose } from '@bigcapital/webapp/utils';
import { JournalDialogs } from './JournalDialogs';
import { useJournalQuery } from './utils';

/**
 * Journal sheet.
 */
function Journal({
  // #withJournalActions
  toggleJournalSheetFilter,
}) {
  const { query, setLocationQuery } = useJournalQuery();

  // Handle financial statement filter change.
  const handleFilterSubmit = useCallback(
    (filter) => {
      const _filter = {
        ...filter,
        fromDate: moment(filter.fromDate).format('YYYY-MM-DD'),
        toDate: moment(filter.toDate).format('YYYY-MM-DD'),
      };
      setLocationQuery(_filter);
    },
    [setLocationQuery],
  );
  // Hide the journal sheet filter drawer once the page unmount.
  useEffect(
    () => () => {
      toggleJournalSheetFilter(false);
    },
    [toggleJournalSheetFilter],
  );

  return (
    <JournalSheetProvider query={query}>
      <JournalActionsBar />

      <DashboardPageContent>
        <FinancialStatement>
          <JournalHeader onSubmitFilter={handleFilterSubmit} pageFilter={query} />
          <JournalSheetLoadingBar />
          <JournalSheetAlerts />
          <JournalBody />
        </FinancialStatement>
      </DashboardPageContent>

      <JournalDialogs />
    </JournalSheetProvider>
  );
}

export default compose(withDashboardActions, withJournalActions)(Journal);
