import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import { FinancialSheetSkeleton } from '@bigcapital/webapp/components';
import { FinancialReportBody } from '../FinancialReportPage';
import { useARAgingSummaryContext } from './ARAgingSummaryProvider';
import ARAgingSummaryTable from './ARAgingSummaryTable';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';

/**
 * A/R Aging summary body.
 * @returns {JSX.Element}
 */
function ARAgingSummaryBodyJSX({
  // #withCurrentOrganization
  organizationName,
}) {
  const { isARAgingLoading } = useARAgingSummaryContext();

  return (
    <FinancialReportBody>
      {isARAgingLoading ? <FinancialSheetSkeleton /> : <ARAgingSummaryTable organizationName={organizationName} />}
    </FinancialReportBody>
  );
}

export const ARAgingSummaryBody = R.compose(
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization.name,
  })),
)(ARAgingSummaryBodyJSX);
