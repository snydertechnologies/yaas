import { Choose, FFormGroup, FInputGroup } from '@bigcapital/webapp/components';
import { Classes, ControlGroup } from '@blueprintjs/core';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

function PercentageFormField() {
  return (
    <FFormGroup label={intl.get('expenses.dialog.percentage')} name={'percentage'}>
      <FInputGroup name="percentage" />
    </FFormGroup>
  );
}

function CustomPirceField() {
  return (
    <ControlGroup className={Classes.FILL}>
      <FFormGroup name={'expenseUnitPrice'} label={intl.get('expenses.dialog.unit_price')}>
        <FInputGroup name="expenseUnitPrice" />
      </FFormGroup>
      <FFormGroup name={'expenseTotal'} label={intl.get('expenses.dialog.total')}>
        <FInputGroup name="expenseTotal" />
      </FFormGroup>
    </ControlGroup>
  );
}

/**
 * Expense form charge fields.
 * @returns
 */
export default function ExpenseFormChargeFields() {
  const { values } = useFormikContext();

  return (
    <Choose>
      <Choose.When condition={values.expenseCharge === 'markup'}>
        <PercentageFormField />
      </Choose.When>
      <Choose.When condition={values.expenseCharge === 'custom_pirce'}>
        <CustomPirceField />
      </Choose.When>
    </Choose>
  );
}
