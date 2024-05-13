import { FormGroup, Intent, NumericInput } from '@blueprintjs/core';
import classNames from 'classnames';
// @ts-nocheck
import React, { useState, useEffect } from 'react';

import { CellType } from '@bigcapital/webapp/constants';
import { CLASSES } from '@bigcapital/webapp/constants/classes';

/**
 * Numeric input table cell.
 */
export default function NumericInputCell({ row: { index }, column: { id }, cell: { value: initialValue }, payload }) {
  const [value, setValue] = useState(initialValue);

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };
  const onBlur = () => {
    payload.updateData(index, id, value);
  };
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const error = payload.errors?.[index]?.[id];

  return (
    <FormGroup intent={error ? Intent.DANGER : null} className={classNames(CLASSES.FILL)}>
      <NumericInput
        value={value}
        onValueChange={handleValueChange}
        onBlur={onBlur}
        fill={true}
        buttonPosition={'none'}
      />
    </FormGroup>
  );
}

NumericInputCell.cellType = CellType.Field;
