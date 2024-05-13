import { FormattedMessage as T } from '@bigcapital/webapp/components';
import { Icon } from '@bigcapital/webapp/components';
import { Button, Classes, Divider, Menu, MenuItem, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
import classNames from 'classnames';
// @ts-nocheck
import React, { useMemo, useState } from 'react';

/**
 * Dashboard action views list.
 */
export function DashboardActionViewsList({ resourceName, allMenuItem, allMenuItemText, views, onChange }) {
  const handleClickViewItem = (view) => {
    onChange && onChange(view);
  };

  const viewsMenuItems = views.map((view) => <MenuItem onClick={() => handleClickViewItem(view)} text={view.name} />);

  const handleAllTabClick = () => {
    handleClickViewItem(null);
  };

  const content = (
    <Menu>
      {allMenuItem && (
        <>
          <MenuItem onClick={handleAllTabClick} text={allMenuItemText || 'All'} />
          <Divider />
        </>
      )}
      {viewsMenuItems}
    </Menu>
  );

  return (
    <Popover
      content={content}
      minimal={true}
      interactionKind={PopoverInteractionKind.CLICK}
      position={Position.BOTTOM_LEFT}
    >
      <Button
        className={classNames(Classes.MINIMAL, 'button--table-views')}
        icon={<Icon icon="table-16" iconSize={16} />}
        text={<T id={'table_views'} />}
        rightIcon={'caret-down'}
      />
    </Popover>
  );
}
