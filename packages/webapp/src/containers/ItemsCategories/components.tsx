import { Icon } from '@bigcapital/webapp/components';
import { safeCallback } from '@bigcapital/webapp/utils';
import { Button, Intent, Menu, MenuDivider, MenuItem, Popover, Position } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

/**
 * Row actions menu list.
 */
export function ActionMenuList({ row: { original }, payload: { onEditCategory, onDeleteCategory } }) {
  return (
    <Menu>
      <MenuItem
        icon={<Icon icon="pen-18" />}
        text={intl.get('edit_category')}
        onClick={safeCallback(onEditCategory, original)}
      />
      <MenuDivider />
      <MenuItem
        text={intl.get('delete_category')}
        intent={Intent.DANGER}
        onClick={safeCallback(onDeleteCategory, original)}
        icon={<Icon icon="trash-16" iconSize={16} />}
      />
    </Menu>
  );
}

/**
 * Table actions cell.
 */
export function TableActionsCell(props) {
  return (
    <Popover content={<ActionMenuList {...props} />} position={Position.RIGHT_TOP}>
      <Button icon={<Icon icon="more-h-16" iconSize={16} />} />
    </Popover>
  );
}

/**
 * Retrieve the items categories table columns.
 */
export function useItemsCategoriesTableColumns() {
  return React.useMemo(
    () => [
      {
        id: 'name',
        Header: intl.get('category_name'),
        accessor: 'name',
        width: 220,
      },

      {
        id: 'count',
        Header: intl.get('count'),
        accessor: 'count',
        className: 'count',
        width: 180,
      },
      {
        id: 'description',
        Header: intl.get('description'),
        accessor: 'description',
        className: 'description',
        width: 220,
      },
    ],
    [],
  );
}
