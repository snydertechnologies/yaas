import { Icon } from '@bigcapital/webapp/components';
import { safeCallback } from '@bigcapital/webapp/utils';
import { Intent, Menu, MenuItem } from '@blueprintjs/core';
// @ts-nocheck
import React from 'react';
import intl from 'react-intl-universal';

/**
 * Table actions cell.
 */
export function ActionMenu({ payload: { onDelete }, row: { original } }) {
  return (
    <Menu>
      <MenuItem
        text={intl.get('purchases.action.delete')}
        intent={Intent.DANGER}
        onClick={safeCallback(onDelete, original)}
        icon={<Icon icon="trash-16" iconSize={16} />}
      />
    </Menu>
  );
}
