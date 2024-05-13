import moment from 'moment';
// @ts-nocheck
import React, { useEffect, useCallback } from 'react';

import { DashboardPageContent, FinancialStatement } from '@bigcapital/webapp/components';
import { SalesByItemProvider } from './SalesByItemProvider';
import SalesByItemsActionsBar from './SalesByItemsActionsBar';
import { SalesByItemsBody } from './SalesByItemsBody';
import SalesByItemsHeader from './SalesByItemsHeader';
import { SalesByItemsLoadingBar } from './components';

import withSalesByItemsActions from './withSalesByItemsActions';

import { compose } from '@bigcapital/webapp/utils';
import { SalesByItemsDialogs } from './SalesByitemsDialogs';
import { useSalesByItemsQuery } from './utils';

/**
 * Sales by items.
 */
function SalesByItems({
  // #withSellsByItemsActions
  toggleSalesByItemsFilterDrawer,
}) {
  const { query, setLocationQuery } = useSalesByItemsQuery();

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
    setLocationQuery({
      ...filter,
      numberFormat,
    });
  };
  // Hide the filter drawer once the page unmount.
  useEffect(() => () => toggleSalesByItemsFilterDrawer(false), [toggleSalesByItemsFilterDrawer]);

  return (
    <SalesByItemProvider query={query}>
      <SalesByItemsActionsBar numberFormat={query.numberFormat} onNumberFormatSubmit={handleNumberFormatSubmit} />
      <SalesByItemsLoadingBar />

      <DashboardPageContent>
        <FinancialStatement>
          <SalesByItemsHeader pageFilter={query} onSubmitFilter={handleFilterSubmit} />
          <SalesByItemsBody />
        </FinancialStatement>
      </DashboardPageContent>

      <SalesByItemsDialogs />
    </SalesByItemProvider>
  );
}

export default compose(withSalesByItemsActions)(SalesByItems);
