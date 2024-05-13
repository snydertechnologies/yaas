// @ts-nocheck
import React from 'react';

import { FinancialSheetSkeleton } from '@bigcapital/webapp/components/FinancialSheet';
import { FinancialReportBody } from '../FinancialReportPage';
import { useProjectProfitabilitySummaryContext } from './ProjectProfitabilitySummaryProvider';
import ProjectProfitabilitySummaryTable from './ProjectProfitabilitySummaryTable';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Project profitability summary body JSX.
 * @returns {JSX.Element}
 */
function ProjectProfitabilitySummaryBodyJSX({
  // #withCurrentOrganization
  organizationName,
}) {
  const { isProjectProfitabilitySummaryLoading } = useProjectProfitabilitySummaryContext();

  return (
    <FinancialReportBody>
      {isProjectProfitabilitySummaryLoading ? (
        <FinancialSheetSkeleton />
      ) : (
        <ProjectProfitabilitySummaryTable companyName={organizationName} />
      )}
    </FinancialReportBody>
  );
}

export const ProjectProfitabilitySummaryBody = compose(
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization?.name,
  })),
)(ProjectProfitabilitySummaryBodyJSX);
