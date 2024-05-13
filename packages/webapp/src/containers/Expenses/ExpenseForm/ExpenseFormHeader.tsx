import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { CLASSES } from '@bigcapital/webapp/constants/classes';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { sumBy } from 'lodash';
// @ts-nocheck
import React, { useMemo } from 'react';

import { PageFormBigNumber } from '@bigcapital/webapp/components';
import ExpenseFormHeaderFields from './ExpenseFormHeaderFields';

// Expense form header.
export default function ExpenseFormHeader() {
  const {
    values: { currency_code, categories },
  } = useFormikContext();

  // Calculates the expense entries amount.
  const totalExpenseAmount = useMemo(() => sumBy(categories, 'amount'), [categories]);

  return (
    <div className={classNames(CLASSES.PAGE_FORM_HEADER)}>
      <ExpenseFormHeaderFields />
      <PageFormBigNumber label={<T id={'expense_amount'} />} amount={totalExpenseAmount} currencyCode={currency_code} />
    </div>
  );
}
