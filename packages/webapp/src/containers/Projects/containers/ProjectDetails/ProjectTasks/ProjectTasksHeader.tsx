import { FormatDate } from '@bigcapital/webapp/components';
import { calculateStatus } from '@bigcapital/webapp/utils';
import { Intent } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import { DetailFinancialCard, DetailFinancialSection, FinancialCardText, FinancialProgressBar } from '../components';
import { useProjectTaskContext } from './ProjectTaskProvider';

/**
 * Project Tasks header.
 * @returns
 */
export function ProjectTasksHeader() {
  const { project } = useProjectTaskContext();

  return (
    <DetailFinancialSection>
      <DetailFinancialCard label={'Project estimate'} value={project.cost_estimate_formatted} />
      <DetailFinancialCard label={'Invoiced'} value={'0.00'}>
        <FinancialCardText>0% of project estimate</FinancialCardText>
        <FinancialProgressBar intent={Intent.NONE} value={0} />
      </DetailFinancialCard>
      <DetailFinancialCard label={'Time & Expenses'} value={'0.00'}>
        <FinancialCardText>0% of project estimate</FinancialCardText>
        <FinancialProgressBar intent={Intent.NONE} value={0} />
      </DetailFinancialCard>

      <DetailFinancialCard label={'To be invoiced'} value={'3.14'} />
      <DetailFinancialCard label={'Deadline'} value={<FormatDate value={project.deadline_formatted} />}>
        <FinancialCardText>4 days to go</FinancialCardText>
      </DetailFinancialCard>
    </DetailFinancialSection>
  );
}
