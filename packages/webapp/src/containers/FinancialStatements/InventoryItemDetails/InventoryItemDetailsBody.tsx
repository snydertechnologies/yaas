import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import { useInventoryItemDetailsContext } from './InventoryItemDetailsProvider';
import { InventoryItemDetailsTable } from './InventoryItemDetailsTable';

import { FinancialSheetSkeleton } from '@bigcapital/webapp/components/FinancialSheet';
import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';
import { FinancialReportBody } from '../FinancialReportPage';

/**
 * Inventory item details body.
 * @returns {JSX.Element}
 */
function InventoryItemDetailsBodyJSX({
  // #withCurrentOrganization
  organizationName,
}) {
  const { isInventoryItemDetailsLoading } = useInventoryItemDetailsContext();

  return (
    <FinancialReportBody>
      {isInventoryItemDetailsLoading ? (
        <FinancialSheetSkeleton />
      ) : (
        <InventoryItemDetailsTable companyName={organizationName} />
      )}
    </FinancialReportBody>
  );
}

export const InventoryItemDetailsBody = R.compose(
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization.name,
  })),
)(InventoryItemDetailsBodyJSX);
