import { CLASSES } from '@bigcapital/webapp/constants/classes';
import classNames from 'classnames';
// @ts-nocheck
import React from 'react';
import ExpenseFormEntriesField from './ExpenseFormEntriesField';

export default function ExpenseFormBody() {
  return (
    <div className={classNames(CLASSES.PAGE_FORM_BODY)}>
      <ExpenseFormEntriesField />
    </div>
  );
}
