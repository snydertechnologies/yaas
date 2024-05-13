import { CellType } from '@bigcapital/webapp/constants';
import { Classes, FormGroup, InputGroup, Intent } from '@blueprintjs/core';
import classNames from 'classnames';
// @ts-nocheck
import React, { useState, useEffect } from 'react';

const InputEditableCell = ({ row: { index }, column: { id }, cell: { value: initialValue }, payload }) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    payload.updateData(index, id, value);
  };
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const error = payload.errors?.[index]?.[id];

  return (
    <FormGroup intent={error ? Intent.DANGER : null} className={classNames(Classes.FILL)}>
      <InputGroup value={value} onChange={onChange} onBlur={onBlur} fill={true} />
    </FormGroup>
  );
};

InputEditableCell.cellType = CellType.Field;

export default InputEditableCell;
