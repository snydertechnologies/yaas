import { Icon, FormattedMessage as T } from '@bigcapital/webapp/components';
import { Button, Menu, MenuItem, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

/**
 * Vendor more actions menu items.
 * @param {*} param0
 */
export function VendorMoreMenuItem({ payload: { onEditOpeningBalance } }) {
  return (
    <Popover
      minimal={true}
      interactionKind={PopoverInteractionKind.CLICK}
      position={Position.BOTTOM_LEFT}
      modifiers={{
        offset: { offset: '0, 4' },
      }}
      content={
        <Menu>
          <MenuItem text={<T id={'vendor.drawer.action.edit_opening_balance'} />} onClick={onEditOpeningBalance} />
        </Menu>
      }
    >
      <Button icon={<Icon icon="more-vert" iconSize={16} />} minimal={true} />
    </Popover>
  );
}
