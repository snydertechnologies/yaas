import { DashboardContentTable } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { ProjectSalesTable } from './ProjectSalesTable';

/**
 * Project Sales Table.
 * @returns
 */
export default function ProjectSalesTableRoot() {
  return (
    <ProjectSalesContentTable>
      <ProjectSalesTable />
    </ProjectSalesContentTable>
  );
}

const ProjectSalesContentTable = styled(DashboardContentTable)``;
