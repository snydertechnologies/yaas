// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import { CommercialDocBox } from '@bigcapital/webapp/components';

import ExpenseDrawerActionBar from './ExpenseDrawerActionBar';
import ExpenseDrawerFooter from './ExpenseDrawerFooter';
import ExpenseDrawerHeader from './ExpenseDrawerHeader';
import ExpenseDrawerTable from './ExpenseDrawerTable';

/**
 * Expense view details.
 */
export default function ExpenseDrawerDetails() {
  return (
    <ExpenseDetailsRoot>
      <ExpenseDrawerActionBar />

      <CommercialDocBox>
        <ExpenseDrawerHeader />
        <ExpenseDrawerTable />
        <ExpenseDrawerFooter />
      </CommercialDocBox>
    </ExpenseDetailsRoot>
  );
}

const ExpenseDetailsRoot = styled.div``;
