import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';

import { FinancialSheetSkeleton } from '@bigcapital/webapp/components/FinancialSheet';
import { FinancialReportBody } from '../FinancialReportPage';
import CustomersTransactionsTable from './CustomersTransactionsTable';

import { useCustomersTransactionsContext } from './CustomersTransactionsProvider';

/**
 * Customers transactions body.
 */
function CustomersTransactionsBodyJSX({
  // #withCurrentOrganization
  organizationName,
}) {
  const { isCustomersTransactionsLoading } = useCustomersTransactionsContext();

  return (
    <FinancialReportBody>
      {isCustomersTransactionsLoading ? (
        <FinancialSheetSkeleton />
      ) : (
        <CustomersTransactionsTable companyName={organizationName} />
      )}
    </FinancialReportBody>
  );
}

export const CustomersTransactionsBody = R.compose(
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization.name,
  })),
)(CustomersTransactionsBodyJSX);
