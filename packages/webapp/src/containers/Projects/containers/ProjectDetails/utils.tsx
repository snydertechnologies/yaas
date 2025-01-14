//@ts-nocheck

import { calculateStatus } from '@bigcapital/webapp/utils';
import { subtract } from 'lodash';
import moment from 'moment';
import React from 'react';
import { useProjectDetailContext } from './ProjectDetailProvider';

function calculateProject(costEstiate, totalAmount) {
  return (costEstiate / totalAmount) * 100;
}

export const useCalculateProject = () => {
  const { project } = useProjectDetailContext();
  const percentageOfInvoice = calculateProject(project?.total_invoiced, project?.cost_estimate);

  const percentageOfExpense = calculateProject(project?.total_expenses, project?.cost_estimate);

  return {
    percentageOfInvoice,
    percentageOfExpense,
  };
};
