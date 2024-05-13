import { DataTable, TableSkeletonHeader, TableSkeletonRows } from '@bigcapital/webapp/components';
import { TABLES } from '@bigcapital/webapp/constants/tables';
import withSettings from '@bigcapital/webapp/containers/Settings/withSettings';
import { useMemorizedColumnsWidths } from '@bigcapital/webapp/hooks';
// @ts-nocheck
import React from 'react';
import { ActionMenu } from './components';
import { useProjectSalesColumns } from './hooks';

import { compose } from '@bigcapital/webapp/utils';

/**
 * Porject sales datatable.
 * @returns
 */
function ProjectSalesTableRoot({
  // #withSettings
  salesTableSize,
}) {
  // Retrieve project sales table columns.
  const columns = useProjectSalesColumns();

  // Handle delete sale.
  const handleDeleteSale = () => {};

  // Local storage memorizing columns widths.
  const [initialColumnsWidths, , handleColumnResizing] = useMemorizedColumnsWidths(TABLES.SALES);

  return (
    <DataTable
      columns={columns}
      data={[]}
      manualSortBy={true}
      selectionColumn={true}
      noInitialFetch={true}
      sticky={true}
      ContextMenu={ActionMenu}
      TableLoadingRenderer={TableSkeletonRows}
      TableHeaderSkeletonRenderer={TableSkeletonHeader}
      initialColumnsWidths={initialColumnsWidths}
      onColumnResizing={handleColumnResizing}
      size={salesTableSize}
      payload={{
        onDelete: handleDeleteSale,
      }}
    />
  );
}
export const ProjectSalesTable = compose(
  withSettings(({ salesSettings }) => ({
    salesTableSize: salesSettings?.tableSize,
  })),
)(ProjectSalesTableRoot);
