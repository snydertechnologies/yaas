// @ts-nocheck
import React, { useEffect } from 'react';

import { DashboardPageContent } from '@bigcapital/webapp/components';
import TaxRatesLandingActionsBar from '../containers/TaxRatesLandingActionsBar';
import { TaxRatesLandingProvider } from '../containers/TaxRatesLandingProvider';
import TaxRatesDataTable from '../containers/TaxRatesLandingTable';

/**
 * Tax rates landing page.
 * @returns {JSX.Element}
 */
export default function TaxRatesLanding() {
  return (
    <TaxRatesLandingProvider>
      <TaxRatesLandingActionsBar />

      <DashboardPageContent>
        <TaxRatesDataTable />
      </DashboardPageContent>
    </TaxRatesLandingProvider>
  );
}
