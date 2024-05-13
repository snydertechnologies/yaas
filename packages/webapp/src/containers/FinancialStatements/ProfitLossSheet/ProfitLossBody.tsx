// @ts-nocheck
import React from 'react';

import { FinancialSheetSkeleton } from '@bigcapital/webapp/components';
import { FinancialReportBody } from '../FinancialReportPage';
import { useProfitLossSheetContext } from './ProfitLossProvider';
import ProfitLossSheetTable from './ProfitLossSheetTable';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';

import { compose } from '@bigcapital/webapp/utils';

/**
 * @returns {React.JSX}
 */
function ProfitLossBodyJSX({
  // #withPreferences
  organizationName,
}) {
  const { isLoading } = useProfitLossSheetContext();

  return (
    <FinancialReportBody>
      {isLoading ? <FinancialSheetSkeleton /> : <ProfitLossSheetTable companyName={organizationName} />}
    </FinancialReportBody>
  );
}

export const ProfitLossBody = compose(
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization.name,
  })),
)(ProfitLossBodyJSX);
