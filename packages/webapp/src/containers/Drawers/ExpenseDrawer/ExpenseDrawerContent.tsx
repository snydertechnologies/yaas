// @ts-nocheck
import React from 'react';

import { DrawerBody } from '@bigcapital/webapp/components';

import ExpenseDrawerDetails from './ExpenseDrawerDetails';
import { ExpenseDrawerProvider } from './ExpenseDrawerProvider';

/**
 * Expense drawer content.
 */
export default function ExpenseDrawerContent({
  // #ownProp
  expenseId,
}) {
  return (
    <ExpenseDrawerProvider expenseId={expenseId}>
      <DrawerBody>
        <ExpenseDrawerDetails />
      </DrawerBody>
    </ExpenseDrawerProvider>
  );
}
