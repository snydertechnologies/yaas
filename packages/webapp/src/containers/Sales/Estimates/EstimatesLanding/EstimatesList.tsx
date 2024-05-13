import { DashboardContentTable, DashboardPageContent } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';

import '@bigcapital/webapp/style/pages/SaleEstimate/List.scss';

import EstimatesActionsBar from './EstimatesActionsBar';
import EstimatesDataTable from './EstimatesDataTable';
import EstimatesViewTabs from './EstimatesViewTabs';

import withEstimates from './withEstimates';
import withEstimatesActions from './withEstimatesActions';

import { compose, transformTableStateToQuery } from '@bigcapital/webapp/utils';
import { EstimatesListProvider } from './EstimatesListProvider';

/**
 * Sale estimates list page.
 */
function EstimatesList({
  // #withEstimate
  estimatesTableState,
  estimatesTableStateChanged,

  // #withEstimatesActions
  resetEstimatesTableState,
}) {
  // Resets the estimates table state once the page unmount.
  React.useEffect(
    () => () => {
      resetEstimatesTableState();
    },
    [resetEstimatesTableState],
  );

  return (
    <EstimatesListProvider
      query={transformTableStateToQuery(estimatesTableState)}
      tableStateChanged={estimatesTableStateChanged}
    >
      <EstimatesActionsBar />

      <DashboardPageContent>
        <EstimatesViewTabs />
        <EstimatesDataTable />
      </DashboardPageContent>
    </EstimatesListProvider>
  );
}

export default compose(
  withEstimates(({ estimatesTableState, estimatesTableStateChanged }) => ({
    estimatesTableState,
    estimatesTableStateChanged,
  })),
  withEstimatesActions,
)(EstimatesList);
