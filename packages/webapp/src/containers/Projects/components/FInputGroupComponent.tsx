import { FInputGroup } from '@bigcapital/webapp/components';
import { useFormikContext } from 'formik';
// @ts-nocheck
import React from 'react';

export function FInputGroupComponent({ toField, ...props }) {
  const { values, setFieldValue } = useFormikContext();
  const { expenseQuantity, expenseUnitPrice } = values;
  const total = expenseQuantity * expenseUnitPrice;

  const handleBlur = () => {
    setFieldValue(toField, total);
  };

  const inputGroupProps = {
    onBlur: handleBlur,
    ...props,
  };
  return <FInputGroup {...inputGroupProps} />;
}
