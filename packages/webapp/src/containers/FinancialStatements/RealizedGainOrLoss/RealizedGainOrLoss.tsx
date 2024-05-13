// @ts-nocheck
import React from 'react';

import { DashboardPageContent, FinancialStatement } from '@bigcapital/webapp/components';

import RealizedGainOrLossActionsBar from './RealizedGainOrLossActionsBar';
import RealizedGainOrLossHeader from './RealizedGainOrLossHeader';
import { RealizedGainOrLossProvider } from './RealizedGainOrLossProvider';
import { RealizedGainOrLossLoadingBar } from './components';

import withCurrentOrganization from '../../Organization/withCurrentOrganization';
import withRealizedGainOrLossActions from './withRealizedGainOrLossActions';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Realized Gain or Loss.
 */
function RealizedGainOrLoss({
  // #withPreferences
  organizationName,

  //#withRealizedGainOrLossActions
  toggleRealizedGainOrLossFilterDrawer,
}) {
  // Handle refetch realized Gain or Loss after filter change.
  const handleFilterSubmit = (filter) => {};

  React.useEffect(
    () => () => {
      toggleRealizedGainOrLossFilterDrawer(false);
    },
    [toggleRealizedGainOrLossFilterDrawer],
  );

  return (
    <RealizedGainOrLossProvider>
      <RealizedGainOrLossActionsBar />

      <DashboardPageContent>
        <FinancialStatement>
          <RealizedGainOrLossHeader pageFilter={[]} onSubmitFilter={handleFilterSubmit} />
          <RealizedGainOrLossLoadingBar />
        </FinancialStatement>
      </DashboardPageContent>
    </RealizedGainOrLossProvider>
  );
}

export default compose(
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization.name,
  })),
  withRealizedGainOrLossActions,
)(RealizedGainOrLoss);
