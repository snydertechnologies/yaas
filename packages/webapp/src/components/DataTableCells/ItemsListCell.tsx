import { Classes, FormGroup, Intent } from '@blueprintjs/core';
import classNames from 'classnames';
// @ts-nocheck
import React, { useCallback, useRef } from 'react';
import intl from 'react-intl-universal';

import { ItemsSuggestField } from '@bigcapital/webapp/components';
import { CellType } from '@bigcapital/webapp/constants';

import { useCellAutoFocus } from '@bigcapital/webapp/hooks';

/**
 * Items list cell.
 */
export default function ItemsListCell({
  column: { id, filterSellable, filterPurchasable, fieldProps, formGroupProps },
  row: { index },
  cell: { value: initialValue },
  payload: { items, updateData, errors, autoFocus },
}) {
  const fieldRef = useRef();

  // Auto-focus the items list input field.
  useCellAutoFocus(fieldRef, autoFocus, id, index);

  // Handle the item selected.
  const handleItemSelected = useCallback(
    (item) => {
      updateData(index, id, item.id);
    },
    [updateData, index, id],
  );

  const error = errors?.[index]?.[id];

  return (
    <FormGroup
      intent={error ? Intent.DANGER : null}
      className={classNames('form-group--select-list', Classes.FILL)}
      {...formGroupProps}
    >
      <ItemsSuggestField
        items={items}
        onItemSelected={handleItemSelected}
        selectedItemId={initialValue}
        sellable={filterSellable}
        purchasable={filterPurchasable}
        inputProps={{
          inputRef: (ref) => (fieldRef.current = ref),
          placeholder: intl.get('enter_an_item'),
        }}
        openOnKeyDown={true}
        blurOnSelectClose={false}
        {...fieldProps}
      />
    </FormGroup>
  );
}

ItemsListCell.cellType = CellType.Field;
