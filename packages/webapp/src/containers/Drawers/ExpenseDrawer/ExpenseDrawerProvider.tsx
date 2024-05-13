import { DrawerHeaderContent, DrawerLoading } from '@bigcapital/webapp/components';
import { Features } from '@bigcapital/webapp/constants';
import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { useExpense } from '@bigcapital/webapp/hooks/query';
import { useFeatureCan } from '@bigcapital/webapp/hooks/state';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

const ExpenseDrawerDrawerContext = React.createContext();

/**
 * Expense drawer provider.
 */
function ExpenseDrawerProvider({ expenseId, ...props }) {
  // Features guard.
  const { featureCan } = useFeatureCan();

  // Fetch the expense details.
  const {
    data: expense,
    isLoading: isExpenseLoading,
    isFetching: isExpenseFetching,
  } = useExpense(expenseId, {
    enabled: !!expenseId,
  });

  // Provider.
  const provider = {
    expenseId,
    expense,

    isExpenseFetching,
    isExpenseLoading,
  };

  return (
    <DrawerLoading loading={isExpenseLoading}>
      <DrawerHeaderContent
        name={DRAWERS.EXPENSE_DETAILS}
        title={intl.get('expense.drawer.title')}
        subTitle={
          featureCan(Features.Branches)
            ? intl.get('expense.drawer.subtitle', {
                value: expense.branch?.name,
              })
            : null
        }
      />
      <ExpenseDrawerDrawerContext.Provider value={provider} {...props} />
    </DrawerLoading>
  );
}
const useExpenseDrawerContext = () => React.useContext(ExpenseDrawerDrawerContext);

export { ExpenseDrawerProvider, useExpenseDrawerContext };
