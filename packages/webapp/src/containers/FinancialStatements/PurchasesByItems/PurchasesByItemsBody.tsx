import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

import { FinancialSheetSkeleton } from '@bigcapital/webapp/components';
import { FinancialReportBody } from '../FinancialReportPage';
import { usePurchaseByItemsContext } from './PurchasesByItemsProvider';
import PurchasesByItemsTable from './PurchasesByItemsTable';

import withCurrentOrganization from '@bigcapital/webapp/containers/Organization/withCurrentOrganization';

/**
 * Purchases by items.
 * @returns {JSX.Element}
 */
function PurchasesByItemsBodyJSX({
  // #withPreferences
  organizationName,
}) {
  const { isLoading } = usePurchaseByItemsContext();

  return (
    <FinancialReportBody>
      {isLoading ? <FinancialSheetSkeleton /> : <PurchasesByItemsTable companyName={organizationName} />}
    </FinancialReportBody>
  );
}

export const PurchasesByItemsBody = R.compose(
  withCurrentOrganization(({ organization }) => ({
    organizationName: organization.name,
  })),
)(PurchasesByItemsBodyJSX);
