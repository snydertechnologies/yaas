// @ts-nocheck
import React, { createContext, useMemo, useContext } from 'react';

import { useProjects } from '@bigcapital/webapp/containers/Projects/hooks';
import FinancialReportPage from '../FinancialReportPage';
import { transformFilterFormToQuery } from '../common';
import { useProjectProfitabilitySummary } from './hooks';

const ProjectProfitabilitySummaryContext = createContext();

function ProjectProfitabilitySummaryProvider({ filter, ...props }) {
  // Transformes the given filter to query.
  const query = useMemo(() => transformFilterFormToQuery(filter), [filter]);

  // Handle fetching the items table based on the given query.
  const {
    data: projectProfitabilitySummary,
    isFetching: isProjectProfitabilitySummaryFetching,
    isLoading: isProjectProfitabilitySummaryLoading,
    refetch: refetchProjectProfitabilitySummary,
  } = useProjectProfitabilitySummary(query, { keepPreviousData: true });

  // Fetch project list.
  const {
    data: { projects },
    isLoading: isProjectsLoading,
  } = useProjects();

  const provider = {
    projectProfitabilitySummary,
    isProjectProfitabilitySummaryFetching,
    isProjectProfitabilitySummaryLoading,
    refetchProjectProfitabilitySummary,
    projects,

    query,
    filter,
  };
  return (
    <FinancialReportPage name={'project-profitability-summary'}>
      <ProjectProfitabilitySummaryContext.Provider value={provider} {...props} />
    </FinancialReportPage>
  );
}

const useProjectProfitabilitySummaryContext = () => useContext(ProjectProfitabilitySummaryContext);

export { ProjectProfitabilitySummaryProvider, useProjectProfitabilitySummaryContext };
