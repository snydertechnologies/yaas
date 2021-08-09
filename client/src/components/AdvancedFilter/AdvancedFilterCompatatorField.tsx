import React, { useMemo } from 'react';
import { HTMLSelect, Classes } from '@blueprintjs/core';
import intl from 'react-intl-universal';
import { getConditionTypeCompatators } from './utils';

export default function DynamicFilterCompatatorField({
  dataType,
  ...restProps
}) {
  const options = useMemo(
    () => getConditionTypeCompatators(dataType).map(comp => ({
      value: comp.value, label: intl.get(comp.label),
    })),
    [dataType]
  );

  return (
    <HTMLSelect
      options={options}
      className={Classes.FILL}
      {...{ ...restProps }}
    />
  );
}