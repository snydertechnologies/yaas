import { CellType } from '@bigcapital/webapp/constants';
import { Checkbox } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
export default function TableIndeterminateCheckboxRow({ row }) {
  return (
    <div className="selection-checkbox">
      <Checkbox {...row.getToggleRowSelectedProps()} />
    </div>
  );
}

TableIndeterminateCheckboxRow.cellType = CellType.Field;
