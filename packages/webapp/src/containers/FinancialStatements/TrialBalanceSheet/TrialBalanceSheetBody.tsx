import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import { FinancialSheetSkeleton } from '@bigcapital/webapp/components';
import { FinancialReportBody } from '../FinancialReportPage';
import { useTrialBalanceSheetContext } from './TrialBalanceProvider';
import TrialBalanceSheetTable from './TrialBalanceSheetTable';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';

/**
 * Trial balance sheet body.
 * @returns {React.JSX}
 */
function TrialBalanceSheetBodyJSX({
  // #withCurrentOrganization
  organizationName,
}) {
  const { isLoading } = useTrialBalanceSheetContext();

  return (
    <FinancialReportBody>
      {isLoading ? <FinancialSheetSkeleton /> : <TrialBalanceSheetTable companyName={organizationName} />}
    </FinancialReportBody>
  );
}

export const TrialBalanceSheetBody = R.compose(
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization.name,
  })),
)(TrialBalanceSheetBodyJSX);
