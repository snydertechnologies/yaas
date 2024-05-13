import moment from 'moment';
// @ts-nocheck
import { useCallback, useEffect } from 'react';

import { DashboardPageContent } from '@bigcapital/webapp/components';
import InventoryValuationActionsBar from './InventoryValuationActionsBar';
import InventoryValuationHeader from './InventoryValuationHeader';

import { compose } from '@bigcapital/webapp/utils';
import { InventoryValuationBody } from './InventoryValuationBody';
import { InventoryValuationProvider } from './InventoryValuationProvider';
import { InventoryValuationLoadingBar } from './components';
import { useInventoryValuationQuery } from './utils';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';
import { InventoryValuationDialogs } from './InventoryValuationDialogs';
import withInventoryValuationActions from './withInventoryValuationActions';

/**
 * Inventory valuation.
 */
function InventoryValuation({
  // #withInventoryValuationActions
  toggleInventoryValuationFilterDrawer,
}) {
  const { query, setLocationQuery } = useInventoryValuationQuery();

  // Handle filter form submit.
  const handleFilterSubmit = useCallback(
    (filter) => {
      const newFilter = {
        ...filter,
        asDate: moment(filter.asDate).format('YYYY-MM-DD'),
      };
      setLocationQuery(newFilter);
    },
    [setLocationQuery],
  );
  // Handle number format form submit.
  const handleNumberFormatSubmit = (numberFormat) => {
    setLocationQuery({
      ...query,
      numberFormat,
    });
  };
  // Hide the filter drawer once the page unmount.
  useEffect(
    () => () => {
      toggleInventoryValuationFilterDrawer(false);
    },
    [toggleInventoryValuationFilterDrawer],
  );

  return (
    <InventoryValuationProvider query={query}>
      <InventoryValuationActionsBar numberFormat={query.numberFormat} onNumberFormatSubmit={handleNumberFormatSubmit} />
      <InventoryValuationLoadingBar />

      <DashboardPageContent>
        <InventoryValuationHeader pageFilter={query} onSubmitFilter={handleFilterSubmit} />
        <InventoryValuationBody />
      </DashboardPageContent>

      <InventoryValuationDialogs />
    </InventoryValuationProvider>
  );
}

export default compose(
  withInventoryValuationActions,
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization.name,
  })),
)(InventoryValuation);
