import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
import * as R from 'ramda';
// @ts-nocheck
import React, { useCallback } from 'react';
import { FMultiSelect } from '../Forms';

/**
 * Contacts multi-select component.
 */
export function ContactsMultiSelect({ allowCreate, ...multiSelectProps }) {
  // Maybe inject new item props to select component.
  const maybeCreateNewItemRenderer = allowCreate ? createNewItemRenderer : null;
  const maybeCreateNewItemFromQuery = allowCreate ? createNewItemFromQuery : null;

  return (
    <FMultiSelect
      valueAccessor={'id'}
      textAccessor={'display_name'}
      tagAccessor={'display_name'}
      popoverProps={{ minimal: true }}
      fill={true}
      createNewItemRenderer={maybeCreateNewItemRenderer}
      createNewItemFromQuery={maybeCreateNewItemFromQuery}
      {...multiSelectProps}
    />
  );
}

/**
 * Customers multi-select component.
 */
function CustomersMultiSelectRoot({
  // #withDrawerAction
  openDrawer,
  closeDrawer,
  ...props
}) {
  const handleCreateItemClick = () => {
    openDrawer(DRAWERS.QUICK_CREATE_CUSTOMER);
  };
  return <ContactsMultiSelect onCreateItemSelect={handleCreateItemClick} {...props} />;
}

/**
 * Vendors multi-select component.
 */
function VendorsMultiSelectRoot({
  // #withDrawerAction
  openDrawer,
  closeDrawer,
  ...props
}) {
  const handleCreateItemClick = () => {
    openDrawer(DRAWERS.QUICK_WRITE_VENDOR);
  };
  return <ContactsMultiSelect onCreateItemSelect={handleCreateItemClick} {...props} />;
}

export const CustomersMultiSelect = R.compose(withDrawerActions)(CustomersMultiSelectRoot);

export const VendorsMultiSelect = R.compose(withDrawerActions)(VendorsMultiSelectRoot);
