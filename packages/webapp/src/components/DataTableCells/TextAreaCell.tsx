import { CellType } from '@bigcapital/webapp/constants';
import { Classes, FormGroup, Intent, TextArea } from '@blueprintjs/core';
import classNames from 'classnames';
// @ts-nocheck
import React, { useState, useEffect } from 'react';

const TextAreaEditableCell = ({ row: { index }, column: { id }, cell: { value: initialValue }, payload }) => {
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
      <TextArea growVertically={true} large={true} value={value} onChange={onChange} onBlur={onBlur} fill={true} />
    </FormGroup>
  );
};

TextAreaEditableCell.cellType = CellType.Field;

export default TextAreaEditableCell;
