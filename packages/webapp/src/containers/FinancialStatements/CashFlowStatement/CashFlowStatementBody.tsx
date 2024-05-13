import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import { FinancialSheetSkeleton } from '@bigcapital/webapp/components/FinancialSheet';
import { FinancialReportBody } from '../FinancialReportPage';
import CashFlowStatementTable from './CashFlowStatementTable';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';
import { useCashFlowStatementContext } from './CashFlowStatementProvider';

/**
 * Cashflow stement body.
 * @returns {React.JSX}
 */
function CashFlowStatementBodyJSX({
  // #withPreferences
  organizationName,
}) {
  const { isCashFlowLoading } = useCashFlowStatementContext();

  return (
    <FinancialReportBody>
      {isCashFlowLoading ? <FinancialSheetSkeleton /> : <CashFlowStatementTable companyName={organizationName} />}
    </FinancialReportBody>
  );
}

export const CashFlowStatementBody = R.compose(
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization.name,
  })),
)(CashFlowStatementBodyJSX);
