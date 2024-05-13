import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import { useInventoryValuationContext } from './InventoryValuationProvider';
import InventoryValuationTable from './InventoryValuationTable';

import { FinancialSheetSkeleton } from '@bigcapital/webapp/components/FinancialSheet';
import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';
import { FinancialReportBody } from '../FinancialReportPage';

/**
 * Inventory valuation body.
 * @returns {JSX.Element}
 */
function InventoryValuationBodyJSX({
  // #withCurrentOrganization
  organizationName,
}) {
  const { isLoading } = useInventoryValuationContext();

  return (
    <FinancialReportBody>
      {isLoading ? <FinancialSheetSkeleton /> : <InventoryValuationTable companyName={organizationName} />}
    </FinancialReportBody>
  );
}

export const InventoryValuationBody = R.compose(
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization.name,
  })),
)(InventoryValuationBodyJSX);
