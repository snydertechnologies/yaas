// @ts-nocheck
import React from 'react';

import { DataTable, TableFastCell, TableSkeletonHeader, TableSkeletonRows } from '@bigcapital/webapp/components';
import { TABLES } from '@bigcapital/webapp/constants/tables';

import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';

import { useMemorizedColumnsWidths } from '@bigcapital/webapp/hooks';
import { compose } from '@bigcapital/webapp/utils';
import { useCashFlowAccountsContext } from './CashFlowAccountsProvider';
import { useCashFlowAccountsTableColumns } from './components';

/**
 * Cash flow accounts data table.
 */
function CashFlowAccountsDataTable({
  // #withSettings
  cashflowTableSize,
}) {
  // Retrieve list context.
  const { cashflowAccounts, isCashFlowAccountsFetching, isCashFlowAccountsLoading } = useCashFlowAccountsContext();

  // Retrieve table columns.
  const columns = useCashFlowAccountsTableColumns();

  // Local storage memorizing columns widths.
  const [initialColumnsWidths, , handleColumnResizing] = useMemorizedColumnsWidths(TABLES.CASHFLOW_ACCOUNTS);

  return (
    <DataTable
      noInitialFetch={true}
      columns={columns}
      data={cashflowAccounts}
      selectionColumn={false}
      sticky={true}
      loading={isCashFlowAccountsLoading}
      headerLoading={isCashFlowAccountsLoading}
      progressBarLoading={isCashFlowAccountsFetching}
      expandColumnSpace={1}
      expandToggleColumn={2}
      selectionColumnWidth={45}
      TableCellRenderer={TableFastCell}
      TableLoadingRenderer={TableSkeletonRows}
      TableHeaderSkeletonRenderer={TableSkeletonHeader}
      initialColumnsWidths={initialColumnsWidths}
      onColumnResizing={handleColumnResizing}
      size={cashflowTableSize}
    />
  );
}

export default compose(
  withSettings(({ cashflowSettings }) => ({
    cashflowTableSize: cashflowSettings?.tableSize,
  })),
)(CashFlowAccountsDataTable);
