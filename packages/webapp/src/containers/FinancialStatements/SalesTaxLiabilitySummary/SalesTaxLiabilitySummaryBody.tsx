// @ts-nocheck
import React from 'react';

import { FinancialSheetSkeleton } from '@bigcapital/webapp/components';
import { FinancialReportBody } from '../FinancialReportPage';
import { SalesTaxLiabilitySummaryTable } from './SalesTaxLiabilitySummaryTable';

import { useSalesTaxLiabilitySummaryContext } from './SalesTaxLiabilitySummaryBoot';

/**
 * Sales tax liability summary body.
 * @returns {React.JSX}
 */
export function SalesTaxLiabilitySummaryBody() {
  const { isLoading } = useSalesTaxLiabilitySummaryContext();

  return (
    <FinancialReportBody>
      {isLoading ? <FinancialSheetSkeleton /> : <SalesTaxLiabilitySummaryTable />}
    </FinancialReportBody>
  );
}
