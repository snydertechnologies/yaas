import moment from 'moment';
// @ts-nocheck
import React, { useEffect, useCallback } from 'react';

import PurchasesByItemsActionsBar from './PurchasesByItemsActionsBar';
import PurchasesByItemsHeader from './PurchasesByItemsHeader';

import { DashboardPageContent, FinancialStatement } from '@bigcapital/webapp/components';
import { compose } from '@bigcapital/webapp/utils';
import { PurchasesByItemsBody } from './PurchasesByItemsBody';
import { PurchasesByItemsProvider } from './PurchasesByItemsProvider';
import { PurchasesByItemsLoadingBar } from './components';
import { usePurchasesByItemsQuery } from './utils';

import { PurchasesByItemsDialogs } from './PurchasesByItemsDialogs';
import withPurchasesByItemsActions from './withPurchasesByItemsActions';

/**
 * Purchases by items.
 */
function PurchasesByItems({
  // #withPurchasesByItemsActions
  togglePurchasesByItemsFilterDrawer,
}) {
  const { query, setLocationQuery } = usePurchasesByItemsQuery();

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
  // Handle number format form submit.
  const handleNumberFormatSubmit = (numberFormat) => {
    setFilter({
      ...filter,
      numberFormat,
    });
  };
  // Hide the filter drawer once the page unmount.
  useEffect(
    () => () => {
      togglePurchasesByItemsFilterDrawer(false);
    },
    [togglePurchasesByItemsFilterDrawer],
  );

  return (
    <PurchasesByItemsProvider query={query}>
      <PurchasesByItemsActionsBar numberFormat={query.numberFormat} onNumberFormatSubmit={handleNumberFormatSubmit} />
      <PurchasesByItemsLoadingBar />

      <DashboardPageContent>
        <FinancialStatement>
          <PurchasesByItemsHeader pageFilter={query} onSubmitFilter={handleFilterSubmit} />
          <PurchasesByItemsBody />
        </FinancialStatement>
      </DashboardPageContent>

      <PurchasesByItemsDialogs />
    </PurchasesByItemsProvider>
  );
}

export default compose(withPurchasesByItemsActions)(PurchasesByItems);
