import { FMultiSelect } from '@bigcapital/webapp/components/Forms';
import withDialogActions from '@bigcapital/webapp/containers/Dialog/withDialogActions';
import * as R from 'ramda';
// @ts-nocheck
import React from 'react';

/**
 * Items multi-select.
 */
function ItemsMultiSelectRoot({
  // #withDialogAction
  openDialog,
  closeDialog,

  // #props
  allowCreate,
  ...multiSelectProps
}) {
  // Maybe inject new item props to select component.
  const maybeCreateNewItemRenderer = allowCreate ? createNewItemRenderer : null;
  const maybeCreateNewItemFromQuery = allowCreate ? createNewItemFromQuery : null;

  // Handles the create item click.
  const handleCreateItemClick = () => {
    openDialog(DialogsName.AccountForm);
  };

  return (
    <FMultiSelect
      valueAccessor={'id'}
      textAccessor={'name'}
      labelAccessor={'code'}
      tagAccessor={'name'}
      fill={true}
      popoverProps={{ minimal: true }}
      resetOnSelect={true}
      createNewItemRenderer={maybeCreateNewItemRenderer}
      createNewItemFromQuery={maybeCreateNewItemFromQuery}
      onCreateItemSelect={handleCreateItemClick}
      {...multiSelectProps}
    />
  );
}

export const ItemsMultiSelect = R.compose(withDialogActions)(ItemsMultiSelectRoot);
