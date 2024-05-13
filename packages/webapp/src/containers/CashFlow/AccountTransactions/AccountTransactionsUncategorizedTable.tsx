// @ts-nocheck
import React from 'react';
import styled from 'styled-components';

import {
  DataTable,
  FormattedMessage as T,
  TableFastCell,
  TableSkeletonHeader,
  TableSkeletonRows,
  TableVirtualizedListRows,
} from '@bigcapital/webapp/components';
import { TABLES } from '@bigcapital/webapp/constants/tables';

import withDrawerActions from '@bigcapital/webapp/containers/Drawer/withDrawerActions';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';

import { useMemorizedColumnsWidths } from '@bigcapital/webapp/hooks';
import { useAccountUncategorizedTransactionsContext } from './AllTransactionsUncategorizedBoot';
import { ActionsMenu, useAccountUncategorizedTransactionsColumns } from './components';

import { DRAWERS } from '@bigcapital/webapp/constants/drawers';
import { compose } from '@bigcapital/webapp/utils';

/**
 * Account transactions data table.
 */
function AccountTransactionsDataTable({
  // #withSettings
  cashflowTansactionsTableSize,

  // #withDrawerActions
  openDrawer,
}) {
  // Retrieve table columns.
  const columns = useAccountUncategorizedTransactionsColumns();

  // Retrieve list context.
  const { uncategorizedTransactions, isUncategorizedTransactionsLoading } =
    useAccountUncategorizedTransactionsContext();

  // Local storage memorizing columns widths.
  const [initialColumnsWidths, , handleColumnResizing] = useMemorizedColumnsWidths(
    TABLES.UNCATEGORIZED_CASHFLOW_TRANSACTION,
  );

  // Handle cell click.
  const handleCellClick = (cell, event) => {
    openDrawer(DRAWERS.CATEGORIZE_TRANSACTION, {
      uncategorizedTransactionId: cell.row.original.id,
    });
  };

  return (
    <CashflowTransactionsTable
      noInitialFetch={true}
      columns={columns}
      data={uncategorizedTransactions || []}
      sticky={true}
      loading={isUncategorizedTransactionsLoading}
      headerLoading={isUncategorizedTransactionsLoading}
      expandColumnSpace={1}
      expandToggleColumn={2}
      selectionColumnWidth={45}
      TableCellRenderer={TableFastCell}
      TableLoadingRenderer={TableSkeletonRows}
      TableRowsRenderer={TableVirtualizedListRows}
      TableHeaderSkeletonRenderer={TableSkeletonHeader}
      ContextMenu={ActionsMenu}
      onCellClick={handleCellClick}
      // #TableVirtualizedListRows props.
      vListrowHeight={cashflowTansactionsTableSize === 'small' ? 32 : 40}
      vListOverscanRowCount={0}
      initialColumnsWidths={initialColumnsWidths}
      onColumnResizing={handleColumnResizing}
      noResults={<T id={'cash_flow.account_transactions.no_results'} />}
      className="table-constrant"
    />
  );
}

export default compose(
  withSettings(({ cashflowTransactionsSettings }) => ({
    cashflowTansactionsTableSize: cashflowTransactionsSettings?.tableSize,
  })),
  withDrawerActions,
)(AccountTransactionsDataTable);

const DashboardConstrantTable = styled(DataTable)`
  .table {
    .thead {
      .th {
        background: #fff;
      }
    }

    .tbody {
      .tr:last-child .td {
        border-bottom: 0;
      }
    }
  }
`;

const CashflowTransactionsTable = styled(DashboardConstrantTable)`
  .table .tbody {
    .tbody-inner .tr.no-results {
      .td {
        padding: 2rem 0;
        font-size: 14px;
        color: #888;
        font-weight: 400;
        border-bottom: 0;
      }
    }

    .tbody-inner {
      .tr .td:not(:first-child) {
        border-left: 1px solid #e6e6e6;
      }

      .td-description {
        color: #5f6b7c;
      }
    }
  }
`;
