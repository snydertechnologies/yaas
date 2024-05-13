import { FSelect } from '@bigcapital/webapp/components';
import { Button, MenuItem } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

/**
 *
 * @param {*}
 * @param {*} param1
 * @returns
 */
const chargeTypeItemRenderer = (item, { handleClick, modifiers, query }) => {
  return <MenuItem label={item.label} key={item.name} onClick={handleClick} text={item.name} />;
};

const chargeTypeSelectProps = {
  itemRenderer: chargeTypeItemRenderer,
  valueAccessor: 'value',
  labelAccessor: 'name',
};

/**
 *
 * @param param0
 * @returns
 */
export function ProjectTaskChargeTypeSelect({ items, ...rest }) {
  return <FSelect {...chargeTypeSelectProps} {...rest} items={items} input={ChargeTypeSelectButton} />;
}
/**
 *
 * @param param0
 * @returns
 */
function ChargeTypeSelectButton({ label }) {
  return <Button text={label} />;
}
