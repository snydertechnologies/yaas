import { Button } from '@blueprintjs/core';
// @ts-nocheck
import React, { useMemo } from 'react';

import FinancialLoadingBar from '../FinancialLoadingBar';

import { Icon, If, FormattedMessage as T } from '@bigcapital/webapp/components';
import { FinancialComputeAlert } from '../FinancialReportPage';
import { useProjectProfitabilitySummaryContext } from './ProjectProfitabilitySummaryProvider';
import { dynamicColumns } from './dynamicColumns';

/**
 * Project profitability summary alerts.
 */
export function ProjectProfitabilitySummaryAlerts() {
  // Handle refetch the report sheet.
  const handleRecalcReport = () => {};

  // Can't display any error if the report is loading.
  // if (isLoading) return null;

  return (
    <If condition={false}>
      <FinancialComputeAlert>
        <Icon icon="info-block" iconSize={12} />
        <T id={'just_a_moment_we_re_calculating_your_cost_transactions'} />
      </FinancialComputeAlert>
    </If>
  );
}

/**
 * Project profitability summary loading bar.
 */
export function ProjectProfitabilitySummaryLoadingBar() {
  return (
    <If condition={false}>
      <FinancialLoadingBar />
    </If>
  );
}

/**
 * Retrieve Project profitability summary columns.
 */
export function useProjectProfitabilitySummaryColumns() {
  // Balance sheet context.
  const {
    projectProfitabilitySummary: { columns, tableRows },
  } = useProjectProfitabilitySummaryContext();

  return useMemo(() => dynamicColumns(columns, tableRows), [tableRows, columns]);
}
