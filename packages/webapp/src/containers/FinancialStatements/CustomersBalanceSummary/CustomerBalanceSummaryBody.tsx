import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import { FinancialSheetSkeleton } from '@bigcapital/webapp/components/FinancialSheet';
import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';
import { FinancialReportBody } from '../FinancialReportPage';
import { useCustomersBalanceSummaryContext } from './CustomersBalanceSummaryProvider';
import CustomersBalanceSummaryTable from './CustomersBalanceSummaryTable';

/**
 * Customer balance summary body.
 * @returns {JSX.Element}
 */
function CustomerBalanceSummaryBodyJSX({
  // #withPreferences
  organizationName,
}) {
  const { isCustomersBalanceLoading } = useCustomersBalanceSummaryContext();

  return (
    <FinancialReportBody>
      {isCustomersBalanceLoading ? (
        <FinancialSheetSkeleton />
      ) : (
        <CustomersBalanceSummaryTable companyName={organizationName} />
      )}
    </FinancialReportBody>
  );
}

export const CustomerBalanceSummaryBody = R.compose(
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization.name,
  })),
)(CustomerBalanceSummaryBodyJSX);
