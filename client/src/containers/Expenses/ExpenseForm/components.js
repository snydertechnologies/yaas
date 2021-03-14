import React from 'react';
import { Button, Tooltip, Intent, Position } from '@blueprintjs/core';
import { FormattedMessage as T, useIntl } from 'react-intl';
import { Icon, Hint } from 'components';
import {
  InputGroupCell,
  MoneyFieldCell,
  AccountsListFieldCell,
} from 'components/DataTableCells';
import { formattedAmount, safeSumBy } from 'utils';

/**
 * Expense category header cell.
 */
const ExpenseCategoryHeaderCell = () => {
  return (
    <>
      <T id={'expense_category'} />
      <Hint />
    </>
  );
};

/**
 * Actions cell renderer.
 */
const ActionsCellRenderer = ({
  row: { index },
  column: { id },
  cell: { value: initialValue },
  data,
  payload,
}) => {
  const onClickRemoveRole = () => {
    payload.removeRow(index);
  };
  return (
    <Tooltip content={<T id={'remove_the_line'} />} position={Position.LEFT}>
      <Button
        icon={<Icon icon="times-circle" iconSize={14} />}
        iconSize={14}
        className="ml2"
        minimal={true}
        intent={Intent.DANGER}
        onClick={onClickRemoveRole}
      />
    </Tooltip>
  );
};

/**
 * Amount footer cell.
 */
function AmountFooterCell({ rows }) {
  const total = safeSumBy(rows, 'original.amount');
  return <span>{formattedAmount(total, 'USD')}</span>;
}

/**
 * Expense account footer cell.
 */
function ExpenseAccountFooterCell() {
  return 'Total';
}

/**
 * Retrieve expense form table entries columns.
 */
export function useExpenseFormTableColumns() {
  const { formatMessage } = useIntl();

  return React.useMemo(
    () => [
      {
        Header: '#',
        accessor: 'index',
        Cell: ({ row: { index } }) => <span>{index + 1}</span>,
        className: 'index',
        width: 40,
        disableResizing: true,
        disableSortBy: true,
      },
      {
        Header: ExpenseCategoryHeaderCell,
        id: 'expense_account_id',
        accessor: 'expense_account_id',
        Cell: AccountsListFieldCell,
        Footer: ExpenseAccountFooterCell,
        className: 'expense_account_id',
        disableSortBy: true,
        width: 40,
        filterAccountsByRootTypes: ['expense'],
      },
      {
        Header: formatMessage({ id: 'amount_currency' }, { currency: 'USD' }),
        accessor: 'amount',
        Cell: MoneyFieldCell,
        Footer: AmountFooterCell,
        disableSortBy: true,
        width: 40,
        className: 'amount',
      },
      {
        Header: formatMessage({ id: 'description' }),
        accessor: 'description',
        Cell: InputGroupCell,
        disableSortBy: true,
        className: 'description',
        width: 100,
      },
      {
        Header: '',
        accessor: 'action',
        Cell: ActionsCellRenderer,
        className: 'actions',
        disableSortBy: true,
        disableResizing: true,
        width: 45,
      },
    ],
    [formatMessage],
  );
}