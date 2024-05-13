import { CellType } from '@bigcapital/webapp/constants';
import { Checkbox, Classes, FormGroup, Intent } from '@blueprintjs/core';
import classNames from 'classnames';
import { get } from 'lodash';
// @ts-nocheck
import React from 'react';

const CheckboxEditableCell = ({
  row: { index, original },
  column: { id, disabledAccessor, checkboxProps },
  cell: { value: initialValue },
  payload,
}) => {
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    const newValue = e.target.checked;

    setValue(newValue);
    payload.updateData(index, id, newValue);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const error = payload.errors?.[index]?.[id];

  // Detarmines whether the checkbox is disabled.
  const disabled = disabledAccessor ? get(original, disabledAccessor) : false;

  return (
    <FormGroup intent={error ? Intent.DANGER : null} className={classNames(Classes.FILL)}>
      <Checkbox
        value={value}
        onChange={onChange}
        checked={initialValue}
        disabled={disabled}
        minimal={true}
        className="ml2"
        {...checkboxProps}
      />
    </FormGroup>
  );
};

CheckboxEditableCell.cellType = CellType.Field;

export default CheckboxEditableCell;
