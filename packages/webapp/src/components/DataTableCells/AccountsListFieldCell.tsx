import { Classes, FormGroup, Intent } from '@blueprintjs/core';
import classNames from 'classnames';
// @ts-nocheck
import React, { useRef, useCallback, useMemo } from 'react';
import intl from 'react-intl-universal';

import { AccountsSuggestField } from '@bigcapital/webapp/components';
import { CellType } from '@bigcapital/webapp/constants';
import { useCellAutoFocus } from '@bigcapital/webapp/hooks';

/**
 * Account cell renderer.
 */
export default function AccountCellRenderer({
  column: { id, accountsDataProp, filterAccountsByRootTypes, filterAccountsByTypes, fieldProps, formGroupProps },
  row: { index, original },
  cell: { value: initialValue },
  payload: { accounts: defaultAccounts, updateData, errors, autoFocus, ...restPayloadProps },
}) {
  const accountRef = useRef();

  useCellAutoFocus(accountRef, autoFocus, id, index);

  const handleAccountSelected = useCallback(
    (account) => {
      updateData(index, id, account.id);
    },
    [updateData, index, id],
  );
  const error = errors?.[index]?.[id];

  const accounts = useMemo(
    () => restPayloadProps[accountsDataProp] || defaultAccounts,
    [restPayloadProps, defaultAccounts, accountsDataProp],
  );

  return (
    <FormGroup
      intent={error ? Intent.DANGER : null}
      className={classNames('form-group--select-list', 'form-group--account', Classes.FILL)}
      {...formGroupProps}
    >
      <AccountsSuggestField
        accounts={accounts}
        onAccountSelected={handleAccountSelected}
        selectedAccountId={initialValue}
        filterByRootTypes={filterAccountsByRootTypes}
        filterByTypes={filterAccountsByTypes}
        inputProps={{
          inputRef: (ref) => (accountRef.current = ref),
          placeholder: intl.get('search'),
        }}
        openOnKeyDown={true}
        blurOnSelectClose={false}
        {...fieldProps}
      />
    </FormGroup>
  );
}
AccountCellRenderer.cellType = CellType.Field;
