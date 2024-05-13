import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
import * as R from 'ramda';
// @ts-nocheck
import React from 'react';
import { FSelect } from '../Forms';
import { createNewItemFromQuery, createNewItemRenderer } from './utils';

/**
 * Customer select field.
 * @returns {React.ReactNode}
 */
function CustomerSelectRoot({
  // #withDrawerActions
  openDrawer,

  // #ownProps
  items,
  allowCreate,
  ...props
}) {
  // Maybe inject create new item props to suggest component.
  const maybeCreateNewItemRenderer = allowCreate ? createNewItemRenderer : null;
  const maybeCreateNewItemFromQuery = allowCreate ? createNewItemFromQuery : null;

  // Handles the create item click.
  const handleCreateItemClick = () => {
    openDrawer(DRAWERS.QUICK_CREATE_CUSTOMER);
  };

  return (
    <FSelect
      items={items}
      textAccessor={'display_name'}
      labelAccessor={'formatted_balance'}
      valueAccessor={'id'}
      popoverProps={{ minimal: true, usePortal: true, inline: false }}
      createNewItemRenderer={maybeCreateNewItemRenderer}
      createNewItemFromQuery={maybeCreateNewItemFromQuery}
      onCreateItemSelect={handleCreateItemClick}
      {...props}
    />
  );
}

export const CustomersSelect = R.compose(withDrawerActions)(CustomerSelectRoot);
