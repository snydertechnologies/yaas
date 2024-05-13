import moment from 'moment';
// @ts-nocheck
import React, { useEffect } from 'react';

import { DashboardPageContent, FinancialStatement } from '@bigcapital/webapp/components';

import InventoryItemDetailsActionsBar from './InventoryItemDetailsActionsBar';
import InventoryItemDetailsHeader from './InventoryItemDetailsHeader';

import { InventoryItemDetailsProvider } from './InventoryItemDetailsProvider';
import { InventoryItemDetailsAlerts, InventoryItemDetailsLoadingBar } from './components';
import withInventoryItemDetailsActions from './withInventoryItemDetailsActions';

import { compose } from '@bigcapital/webapp/utils';
import { InventoryItemDetailsBody } from './InventoryItemDetailsBody';
import { InventoryItemDetailsDialogs } from './InventoryItemDetailsDialogs';
import { useInventoryValuationQuery } from './utils2';

/**
 * inventory item details.
 */
function InventoryItemDetails({
  //#withInventoryItemDetailsActions
  toggleInventoryItemDetailsFilterDrawer: toggleFilterDrawer,
}) {
  const { query, setLocationQuery } = useInventoryValuationQuery();

  // Handle filter submit.
  const handleFilterSubmit = (filter) => {
    const _filter = {
      ...filter,
      fromDate: moment(filter.fromDate).format('YYYY-MM-DD'),
      toDate: moment(filter.toDate).format('YYYY-MM-DD'),
    };
    setLocationQuery({ ..._filter });
  };
  // Handle number format submit.
  const handleNumberFormatSubmit = (values) => {
    setLocationQuery({
      ...query,
      numberFormat: values,
    });
  };
  // Close the report header once the browser leave the page.
  useEffect(() => () => toggleFilterDrawer(false), [toggleFilterDrawer]);

  return (
    <InventoryItemDetailsProvider query={query}>
      <InventoryItemDetailsActionsBar
        numberFormat={query.numberFormat}
        onNumberFormatSubmit={handleNumberFormatSubmit}
      />
      <InventoryItemDetailsLoadingBar />
      <InventoryItemDetailsAlerts />

      <DashboardPageContent>
        <FinancialStatement>
          <InventoryItemDetailsHeader pageFilter={query} onSubmitFilter={handleFilterSubmit} />
          <InventoryItemDetailsBody />
        </FinancialStatement>
      </DashboardPageContent>

      <InventoryItemDetailsDialogs />
    </InventoryItemDetailsProvider>
  );
}

export default compose(withInventoryItemDetailsActions)(InventoryItemDetails);
