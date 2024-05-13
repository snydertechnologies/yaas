// @ts-nocheck
import React from 'react';

import { DashboardPageContent, FinancialStatement } from '@bigcapital/webapp/components';
import { UnrealizedGainOrLossProvider } from './UnrealizedGainOrLossProvider';
import { UnrealizedGainOrLossLoadingBar } from './components';

import UnrealizedGainOrLossActionsBar from './UnrealizedGainOrLossActionsBar';
import UnrealizedGainOrLossHeader from './UnrealizedGainOrLossHeader';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';
import withUnrealizedGainOrLossActions from './withUnrealizedGainOrLossActions';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Unrealized Gain or Loss
 */
function UnrealizedGainOrLoss({
  // #withPreferences
  organizationName,

  //#withUnrealizedGainOrLossActions
  toggleUnrealizedGainOrLossFilterDrawer,
}) {
  // Handle refetch unrealized Gain or Loss after filter change.
  const handleFilterSubmit = (filter) => {};

  React.useEffect(
    () => () => {
      toggleUnrealizedGainOrLossFilterDrawer(false);
    },
    [toggleUnrealizedGainOrLossFilterDrawer],
  );

  return (
    <UnrealizedGainOrLossProvider>
      <UnrealizedGainOrLossActionsBar />
      <DashboardPageContent>
        <FinancialStatement>
          <UnrealizedGainOrLossHeader pageFilter={[]} onSubmitFilter={handleFilterSubmit} />

          <UnrealizedGainOrLossLoadingBar />
        </FinancialStatement>
      </DashboardPageContent>
    </UnrealizedGainOrLossProvider>
  );
}

export default compose(
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization.name,
  })),
  withUnrealizedGainOrLossActions,
)(UnrealizedGainOrLoss);
