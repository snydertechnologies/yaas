import { get } from 'lodash';
// @ts-nocheck
import React from 'react';

import { getForceWidth } from '@bigcapital/webapp/utils';

export function CellForceWidth({ value, column: { forceWidthAccess }, row: { original } }) {
  const forceWidthValue = forceWidthAccess ? get(original, forceWidthAccess) : value;

  return <ForceWidth forceValue={forceWidthValue}>{value}</ForceWidth>;
}

export function ForceWidth({ children, forceValue }) {
  const forceWidthValue = forceValue || children;

  return (
    <span className={'force-width'} style={{ minWidth: getForceWidth(forceWidthValue) }}>
      {children}
    </span>
  );
}
