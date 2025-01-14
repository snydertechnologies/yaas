// @ts-nocheck
import React, { useMemo } from 'react';
import intl from 'react-intl-universal';
import styled from 'styled-components';

import { FinancialSheet, ReportDataTable } from '@bigcapital/webapp/components';
import { TableStyle } from '@bigcapital/webapp/constants';
import { defaultExpanderReducer, tableRowTypesToClassnames } from '@bigcapital/webapp/utils';
import { useProjectProfitabilitySummaryContext } from './ProjectProfitabilitySummaryProvider';
import { useProjectProfitabilitySummaryColumns } from './components';

/**
 * Project profitability summary table.
 */
export default function ProjectProfitabilitySummaryTable({
  // #ownProps
  companyName,
}) {
  // Project profitability summary context.
  const {
    projectProfitabilitySummary: { tableRows },
    query,
  } = useProjectProfitabilitySummaryContext();

  // Retrieve the database columns.
  const tableColumns = useProjectProfitabilitySummaryColumns();

  return (
    <FinancialSheet
      companyName={companyName}
      sheetType={intl.get('project_profitability_summary')}
      fromDate={query.from_date}
      toDate={query.to_date}
      basis={query.basis}
      name="project-profitability-summary"
    >
      <ProjectProfitabilitySummaryDataTable
        columns={tableColumns}
        data={tableRows}
        rowClassNames={tableRowTypesToClassnames}
        noInitialFetch={true}
        sticky={true}
        styleName={TableStyle.Constrant}
      />
    </FinancialSheet>
  );
}

const ProjectProfitabilitySummaryDataTable = styled(ReportDataTable)`
  .table {
    .tbody .tr {
      .td {
        border-bottom: 0;
        padding-top: 0.32rem;
        padding-bottom: 0.32rem;
      }
      &.row_type--TOTAL .td {
        border-top: 1px solid #bbb;
        font-weight: 500;
        border-bottom: 3px double #000;
      }
      &:last-of-type .td {
        border-bottom: 1px solid #bbb;
      }
    }
  }
`;
