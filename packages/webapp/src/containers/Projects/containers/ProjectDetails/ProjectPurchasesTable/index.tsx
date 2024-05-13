import { Box, DashboardContentTable } from '@bigcapital/webapp/components';
// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import { ProjectDetailHeader } from '../ProjectDetailsHeader';
import { ProjectPurchasesTable } from './ProjectPurchasesTable';

/**
 *
 * @returns
 */
export default function ProjectPurchasesTableRoot() {
  return (
    <Box>
      <ProjectDetailHeader />
      <DashboardContentTable>
        <ProjectPurchasesTable />
      </DashboardContentTable>
    </Box>
  );
}
