import { Button, Intent, Menu, MenuItem, Popover, PopoverInteractionKind, Position, Tag } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';

import { Choose, Icon, T } from '@bigcapital/webapp/components';

/**
 * Receipt details status.
 * @returns {React.JSX}
 */
export function ReceiptDetailsStatus({ receipt }) {
  return (
    <Choose>
      <Choose.When condition={receipt.is_closed}>
        <Tag round={true} intent={Intent.SUCCESS}>
          <T id={'closed'} />
        </Tag>
      </Choose.When>

      <Choose.Otherwise>
        <Tag intent={Intent.WARNING} round={true}>
          <T id={'draft'} />
        </Tag>
      </Choose.Otherwise>
    </Choose>
  );
}

export function ReceiptMoreMenuItems({ payload: { onNotifyViaSMS } }) {
  return (
    <Popover
      minimal={true}
      content={
        <Menu>
          <MenuItem onClick={onNotifyViaSMS} text={<T id={'notify_via_sms.dialog.notify_via_sms'} />} />
        </Menu>
      }
      interactionKind={PopoverInteractionKind.CLICK}
      position={Position.BOTTOM_LEFT}
      modifiers={{
        offset: { offset: '0, 4' },
      }}
    >
      <Button icon={<Icon icon="more-vert" iconSize={16} />} minimal={true} />
    </Popover>
  );
}
