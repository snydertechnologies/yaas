// @ts-nocheck
import React from 'react';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';
import BalanceSheetTable from './BalanceSheetTable';

import { FinancialSheetSkeleton } from '@bigcapital/webapp/components';
import { compose } from '@bigcapital/webapp/utils';
import { FinancialReportBody } from '../FinancialReportPage';
import { useBalanceSheetContext } from './BalanceSheetProvider';

/**
 * Balance sheet body JSX.
 * @returns {React.JSX}
 */
function BalanceSheetBodyJSX({
  // #withCurrentOrganization
  organizationName,
}) {
  const { isLoading } = useBalanceSheetContext();

  return (
    <FinancialReportBody>
      {isLoading ? <FinancialSheetSkeleton /> : <BalanceSheetTable companyName={organizationName} />}
    </FinancialReportBody>
  );
}

export const BalanceSheetBody = compose(
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization.name,
  })),
)(BalanceSheetBodyJSX);
