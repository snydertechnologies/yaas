import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import { FinancialSheetSkeleton } from '@bigcapital/webapp/components/FinancialSheet';
import { FinancialReportBody } from '../FinancialReportPage';
import { useAPAgingSummaryContext } from './APAgingSummaryProvider';
import APAgingSummaryTable from './APAgingSummaryTable';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';

/**
 * AP aging summary body.
 * @returns {JSX.Element}
 */
function APAgingSummaryBodyJSX({
  // #withCurrentOrganization
  organizationName,
}) {
  const { isAPAgingLoading } = useAPAgingSummaryContext();

  return (
    <FinancialReportBody>
      {isAPAgingLoading ? <FinancialSheetSkeleton /> : <APAgingSummaryTable organizationName={organizationName} />}
    </FinancialReportBody>
  );
}

export const APAgingSummaryBody = R.compose(
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization?.name,
  })),
)(APAgingSummaryBodyJSX);
