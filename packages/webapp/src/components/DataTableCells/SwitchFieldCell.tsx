import { Classes, FormGroup, Intent, Switch } from '@blueprintjs/core';
import classNames from 'classnames';
// @ts-nocheck
import React from 'react';

import { CellType } from '@bigcapital/webapp/constants';
import { safeInvoke } from '@bigcapital/webapp/utils';

/**
 * Switch editable cell.
 */
const SwitchEditableCell = ({
  row: { index, original },
  column: { id, switchProps, onSwitchChange },
  cell: { value: initialValue },
  payload,
}) => {
  const [value, setValue] = React.useState(initialValue);

  // Handle the switch change.
  const onChange = (e) => {
    const newValue = e.target.checked;

    setValue(newValue);

    safeInvoke(payload.updateData, index, id, newValue);
    safeInvoke(onSwitchChange, e, newValue, original);
  };

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const error = payload.errors?.[index]?.[id];

  return (
    <FormGroup intent={error ? Intent.DANGER : null} className={classNames(Classes.FILL)}>
      <Switch
        value={value}
        onChange={onChange}
        checked={initialValue}
        minimal={true}
        className="ml2"
        {...switchProps}
      />
    </FormGroup>
  );
};

SwitchEditableCell.cellType = CellType.Field;

export default SwitchEditableCell;
