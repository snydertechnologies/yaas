import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Icon } from '@bigcapital/webapp/components';
import { Button, MenuItem } from '@blueprintjs/core';
import { Position } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
// @ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useGetQuickNewMenu } from '@bigcapital/webapp/constants/quickNewOptions';

/**
 * Quick New Dropdown.
 */
export default function QuickNewDropdown() {
  const history = useHistory();
  const quickNewOptions = useGetQuickNewMenu();

  // Can't continue if there is no any quick new menu items to display.
  if (quickNewOptions.length === 0) {
    return null;
  }
  // Handle click quick new button.
  const handleClickQuickNew = ({ path }) => {
    history.push(`/${path}`);
  };

  // Item renderer.
  const itemRenderer = (item, { handleClick, modifiers, query }) => (
    <MenuItem text={item.name} label={item.label} onClick={handleClick} />
  );

  return (
    <Select
      items={quickNewOptions}
      itemRenderer={itemRenderer}
      onItemSelect={(type) => handleClickQuickNew(type)}
      popoverProps={{ minimal: false, position: Position.BOTTOM }}
      className={'form-group--quick-new-downDrop'}
      filterable={false}
    >
      <Button text={<T id={'quick_new'} />} icon={<Icon icon={'plus-24'} iconSize={20} />} minimal={true} />
    </Select>
  );
}
