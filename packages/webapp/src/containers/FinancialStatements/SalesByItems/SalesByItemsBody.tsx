import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import { FinancialSheetSkeleton } from '@bigcapital/webapp/components/FinancialSheet';
import { FinancialReportBody } from '../FinancialReportPage';
import { useSalesByItemsContext } from './SalesByItemProvider';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';
import SalesByItemsTable from './SalesByItemsTable';

/**
 *
 * @returns {JSX.Element}
 */
function SalesByItemsBodyJSX({
  // #withCurrentOrganization
  organizationName,
}) {
  const { isLoading } = useSalesByItemsContext();

  return (
    <FinancialReportBody>
      {isLoading ? <FinancialSheetSkeleton /> : <SalesByItemsTable companyName={organizationName} />}
    </FinancialReportBody>
  );
}

export const SalesByItemsBody = R.compose(
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization.name,
  })),
)(SalesByItemsBodyJSX);
